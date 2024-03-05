"use client";
import { signIn, useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn("google")}>google</button>
    </div>
  );
};

export default page;
