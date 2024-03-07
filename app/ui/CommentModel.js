"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, postIdState } from "../../atoms/modalAtom";
import Modal from "react-modal";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Image from "next/image";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CommentModel = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const postId = useRecoilValue(postIdState);
  const [post, setPost] = useState(null);
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => setPost(snapshot));
  }, [postId, db]);


  async function sendComment() {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    setOpen(false);
    setInput("");
    router.push(`/post/${postId}`);
  }

  if (!post) return <></>;

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          aerialHideApp={false}
          className=" max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md "
        >
          <div className=" p-1">
            <div className=" border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-9 h-9 flex justify-center items-center"
              >
                <XIcon className=" h-[22px] text-gray-700" />
              </div>
            </div>
            <div className=" p-2 flex items-center space-x-1 relative">
              {post.data() && (
                <div>
                  <div className=" flex justify-center items-center ml-2">
                    <span
                      className=" w-0.5 h-10 z-[-1] absolute left-9 top-11 bg-gray-300
                 "
                    ></span>
                    <Image
                      src={post.data().userImg}
                      quality={100}
                      alt="user"
                      width={50}
                      height={50}
                      className=" h-11 w-11 rounded-full mr-4"
                    />
                    <h4 className=" font-bold text-[15px] sm:text-[16px] hover:underline">
                      {post.data().name}
                    </h4>
                    <span className=" text-sm sm:text-[15px]">
                      @{post.data().username} -{" "}
                    </span>
                    <span className=" text-sm sm:text-[15px] hover:underline">
                      <Moment fromNow>{post.data().timestamp?.toDate()}</Moment>
                    </span>
                  </div>
                  <p className=" text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
                    {post?.data()?.text}
                  </p>
                  <div className=" flex border-gray-200 p-3 space-x-3">
                    <Image
                      src={session.user.image}
                      quality={100}
                      alt="user"
                      width={50}
                      height={50}
                      className=" h-10 w-10 rounded-full xl:mr-2"
                    />
                    <div className=" w-full divide-y divide-gray-200">
                      <div>
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          className=" w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[75px] text-gray-700"
                          rows="2"
                          placeholder="Tweet your reply"
                        ></textarea>
                      </div>
                      <div className=" flex items-center justify-between pt-2.5">
                        <div className=" flex">
                          <div>
                            <PhotographIcon className=" h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                            {/* <input
                              type="file"
                              hidden
                              ref={filePickerRef}
                              onChange={addImageToPost}
                            /> */}
                          </div>
                          <EmojiHappyIcon className=" h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                        </div>
                        <button
                          onClick={sendComment}
                          disabled={!input.trim()}
                          className=" bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModel;
