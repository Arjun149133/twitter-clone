"use client";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { themeState } from "@/atoms/modalAtom";
const Input = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const theme = useRecoilValue(themeState);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      username: session.user.username,
      name: session.user.name,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.onload = (readerEvent) => {
        const result = readerEvent.target.result;
        setSelectedFile(result);
      };
      reader.readAsDataURL(e.target.files[0]);

      e.target.value = null;
    }
  };
  return (
    <>
      {session && (
        <div
          className={`${
            theme === "dark" ? " border-gray-800" : " border-gray-200"
          } flex border-b p-3 space-x-3`}
        >
          <Image
            src={session?.user.image}
            quality={100}
            alt="user"
            width={50}
            height={50}
            className=" h-10 w-10 rounded-full xl:mr-2"
          />
          <div className=" w-full divide-y divide-gray-500">
            <div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`w-full border-none focus:ring-0 text-lg tracking-wide min-h-[75px] ${
                  theme === "dark"
                    ? " bg-black text-white"
                    : " text-gray-700 placeholder-gray-700"
                }`}
                rows="2"
                placeholder="Whats happening?"
              ></textarea>
            </div>
            {selectedFile && (
              <div className=" relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className=" h-7 text-black absolute cursor-pointer shadow-md border-white rounded-full border m-1"
                />
                <img
                  src={selectedFile}
                  alt="selected file"
                  className={`${loading && "animate-pulse"} rounded-2xl`}
                />
              </div>
            )}
            <div className=" flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className=" flex">
                    <div onClick={() => filePickerRef.current.click()}>
                      <PhotographIcon className=" h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <EmojiHappyIcon className=" h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className=" bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
