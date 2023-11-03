"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { signUserOut } from "@/firebase/auth";
import Loader from "./Loader";

export default function Navbar() {
  // hooks
  const { user, status } = useAuth();

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <nav
        className={`w-screen bg-white flex justify-around items-center fixed z-10 h-16`}
      >
        <div className="font-medium text-2xl">Todo List</div>
        <ul className="flex gap-5 items-center">
          {status === "authenticated" && (
            <>
              <li>
                <Image
                  src={user?.photoURL || ""}
                  width={50}
                  height={50}
                  alt={"profile"}
                  className="rounded-full w-8"
                />
              </li>
              <li>
                <button onClick={signUserOut}>Sign Out</button>
              </li>
            </>
          )}
          {status === "unauthenticated" && <div></div>}
        </ul>
      </nav>
      <div className="h-16"></div>
    </>
  );
}
