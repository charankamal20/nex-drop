"use client";

import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timeStamp", sort)
      )
  );

  // Check for errors
  if (error) {
    console.error("Error fetching documents:", error);
  }

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => ({
      id: doc.id,
      filename: doc.data().fileName || doc.id,
      timestamp: new Date(doc.data().timeStamp?.seconds * 1000) || undefined,
      fullname: doc.data().userName,
      downloadUrl: doc.data().downloadURL,
      type: doc.data().fileType,
      size: doc.data().fileSize,
    }));

    setInitialFiles(files);
  }, [docs, user, skeletonFiles]);

  if (docs?.docs.length === undefined)
    return (
      <div className="mx-auto flex flex-col max-w-7xl">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="w-full h-5" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="mx-auto  max-w-7xl flex flex-col space-y-5 pb-10">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold">All Files</h1>
        <Button
          onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
          className="ml-auto w-fit"
        >
          Sort By {sort === "desc" ? "Newest" : "Oldest"}
        </Button>
      </div>

      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
