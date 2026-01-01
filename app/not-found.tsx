import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-primary text-accent gap-8 text-3xl">
        <div>
          <Image src="/assets/images/club/fc-barcelona.svg" alt="Not Found" width={200} height={200} />
        </div>
        <div className="items-center text-left gap-2 flex flex-col">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <Link href="/" className="text-2xl text-secondary hover:text-amber-500">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
