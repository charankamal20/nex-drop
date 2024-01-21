import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 space-y-5 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white ">
          <h1 className="text-5xl font-bold">
            Welcome to NexDrop
            <br />
            <br />
            Storing everything for you and your business needs.
            <br />
            All in one place.
          </h1>
          <p className="pb-20">
            Collaborate seamlessly and deliver work faster from anywhere with
            Dropbox. Securely store your content, edit PDFs, share videos, sign
            documents and track file engagement – without leaving Dropbox.
          </p>

          <Link
            className="group hover:brightness-110 transition flex cursor-pointer p-5 w-fit bg-blue-500"
            href="/dashboard"
          >
            Try it for free
            <ArrowRight className="group-hover:translate-x-1 transition-all ml-3 h-6 w-6" />
          </Link>
        </div>

        <div className="h-full bg-[#130f0f] dark:bg-slate-800 px-16 py-12">
          <video
            className=""
            aria-hidden="false"
            autoPlay
            playsInline
            loop
            muted
          >
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080-en_GB.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
