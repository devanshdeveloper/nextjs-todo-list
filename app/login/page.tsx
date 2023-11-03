"use client"

import { signInWithGoogle } from "@/firebase/auth";
import Image from "next/image";

export default function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={signInWithGoogle}
        className="bg-white border-2  flex gap-3 items-center px-3 py-2 rounded-md "
      >
        <Image src="/google.svg" width={24} height={24} alt="google" />
        Continue With Google
      </button>
    </div>
  );
}
