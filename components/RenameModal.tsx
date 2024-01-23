"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.filename,
    ]);

  const renameFile = async () => {
    if (!user || !fileId) return;

    toast({
      title: "Changing File Name...",
    });

    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: input,
      }).then(() => {
        toast({
          title: "File Renamed",
          description: `Your file has been renamed to ${input}.`,
        });
      });
    }
    catch(error) {
      setIsRenameModalOpen(false);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    setInput("");
    setIsRenameModalOpen(false);
  };

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => setIsRenameModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col justify-between items-start gap-4">
            <Label htmlFor="name" className="text-right">
              New File Name
            </Label>
            <Input
              id="link"
              onChange={(e) => {
                setInput(e.target.value)
              }}
              defaultValue={filename}
              onKeyDownCapture={(e) => {
                if (e.key === "Enter") {
                  renameFile();
                }
              }}
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            size={"sm"}
            className="px-3"
            onClick={renameFile}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
