import Link from "next/link";
import Image  from 'next/image';
import { UserButton, SignInButton, SignedOut } from "@clerk/nextjs";


function Header() {
  return (
    <header className="flex justify-between items-center">
      <Link className="flex items-center space-x-2 " href="/">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src="https://www.shareicon.net/data/512x512/2017/04/22/885085_media_512x512.png"
            alt="logo"
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-xl">Dropbox</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        {/* Theme Toggler */}
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl={"/dashboard"} mode="modal"/>
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;