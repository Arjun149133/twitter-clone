"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, postIdState } from "../../atoms/modalAtom";
import Modal from "react-modal";
import { XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import Input from "./Input";

const CommentModel = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const postId = useRecoilValue(postIdState);
  const [post, setPost] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => setPost(snapshot));
  }, [postId, db]);

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          aerialHideApp={false}
          className=" max-w-lg w-[90%] h-[300px] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md "
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
            <div className=" p-2 flex items-center space-x-1">
              {post.data() && (
                <div className=" flex flex-col">
                  <div className=" flex p-1 justify-center items-center">
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
                  <Input />
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
