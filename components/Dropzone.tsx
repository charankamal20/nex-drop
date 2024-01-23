"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import DropzoneComponent from "react-dropzone";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";


function Dropzone() {

  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const {toast} = useToast();
  // 20 MB
  const maxSize = 20 * 1024 * 1024;

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    })
  }

  const uploadPost = async (selectedFile: File) => {
    if(loading) return;
    if(!user) return;

    setLoading(true);

    toast({
      title:"Uploading File..."
    })

    let docRef;
    try {
      docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userID: user.id,
        userName: user.fullName,
        profileImage: user.imageUrl,
        timeStamp: serverTimestamp(),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        fileType: selectedFile.type,
      })
    }
    catch(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLoading(false);
      return;
    }

    // todo - add rollback code here
    // * watch saas video for this

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    try {
      uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
          downloadURL: downloadURL,
        })
      }).then(() => {
        toast({
          title: "File Uploaded Successfully.",
        });
      });
    }
    catch(error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    setLoading(false);
  }

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              className={cn(
                "w-full w-max-4xl h-52 flex bg-slate-100 transition-all dark:bg-slate-800 justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#161a20] dark:bg-[#035FFE] text-white animate-pulse"
                  : "border-gray-300"
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
