import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";

function Header() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md bg-white">
      <div className="flex gap-3 items-center">
        <Image src={"/logo.svg"} height={30} width={30} alt="Logo" />
        <h2 className="font-bold text-xl">AI Short Videos</h2>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1 items-center">
          <Image src={"/dollar.png"} width={20} height={20} alt="Credits" />
          <h2>{userDetails?.credits}</h2>
        </div>
        <Button>Dashboard</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
