"use client";
import Image from "next/image";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import { db, storage } from "../../firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, postIdState, themeState } from "../../atoms/modalAtom";
import { useRouter } from "next/navigation";

const Post = ({ id, post }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const theme = useRecoilValue(themeState);

  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    const unsub2 = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );

    return () => {
      unsub();
      unsub2();
    };
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session?.user.username,
        });
      }
    } else {
      signIn();
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post")) {
      await deleteDoc(doc(db, "posts", id));
      if (post?.data().image) {
        await deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  };

  return (
    <div className=" flex p-1 cursor-pointer border-b border-gray-200 pr-2">
      {/* image  */}
      {post?.data()?.userImg && (
        <Image
          src={post.data().userImg}
          quality={100}
          alt="user"
          width={50}
          height={50}
          className=" h-11 w-11 rounded-full mr-4"
        />
      )}

      {/* right side  */}
      <div className=" flex-1">
        {/* Header  */}
        <div className=" flex items-center justify-between">
          {/* post user info  */}
          <div className=" flex items-center space-x-1 whitespace-nowrap">
            <h4 className=" font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className=" text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon  */}
          <DotsHorizontalIcon className=" h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>
        {/* post text  */}
        <div className=" mb-2">
          <span className=" text-sm sm:text-[15px]">
            @{post?.data()?.username} -{" "}
          </span>
        </div>
        <p
          onClick={() => router.push(`/post/${id}`)}
          className={`${
            theme === "dark"
              ? " text-white font-normal"
              : "text-gray-800 font-semibold"
          } text-[15px] sm:text-[16px] mb-2 opacity-95`}
        >
          {post?.data()?.text}
        </p>

        {/* post image  */}
        {post?.data()?.image && (
          <Image
            onClick={() => router.push(`/post/${id}`)}
            quality={100}
            className=" rounded-2xl mr-2"
            src={post.data().image}
            alt="post-img"
            width={500}
            height={500}
          />
        )}

        {/* icons */}

        <div className=" flex justify-between text-gray-500 p-2">
          <div className=" flex justify-center items-center">
            <ChatIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className={`${
                theme === "dark"
                  ? "darkHoverEffect hover:text-sky-900"
                  : "hoverEffect hover:text-sky-500 hover:bg-red-100"
              } h-9 w-9 hoverEffect p-2`}
            />
            {comments.length > 0 && (
              <span className=" text-sm sm:text-[15px]">{comments.length}</span>
            )}
          </div>
          {session?.user?.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className={`${
                theme === "dark"
                  ? "darkHoverEffect hover:text-red-900"
                  : "hoverEffect hover:text-red-500 hover:bg-red-100"
              } h-9 w-9 hoverEffect p-2`}
            />
          )}
          <div className=" flex items-center">
            {hasLiked ? (
              <FilledHeart
                onClick={likePost}
                className={`${
                  theme === "dark"
                    ? "darkHoverEffect text-red-500"
                    : "hoverEffect text-red-400 hover:bg-red-100"
                } h-9 w-9 hoverEffect p-2`}
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className={`${
                  theme === "dark"
                    ? "darkHoverEffect hover:text-red-900"
                    : "hoverEffect hover:text-red-500 hover:bg-red-100"
                } h-9 w-9 hoverEffect p-2`}
              />
            )}
            {likes.length > 0 && (
              <span
                className={` text-sm sm:text-[15px] ${
                  hasLiked && " text-red-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon
            className={`${
              theme === "dark"
                ? "darkHoverEffect hover:text-sky-900"
                : "hoverEffect hover:text-sky-500 hover:bg-red-100"
            } h-9 w-9 hoverEffect p-2`}
          />
          <ChartBarIcon
            className={`${
              theme === "dark"
                ? "darkHoverEffect hover:text-sky-900"
                : "hoverEffect hover:text-sky-500 hover:bg-red-100"
            } h-9 w-9 hoverEffect p-2`}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
