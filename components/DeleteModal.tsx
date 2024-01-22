import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";


export function DeleteModal() {

    const {user} = useUser();


    const [isDeleteModalOpen, setDeleteModalOpen, fileId, setFileId] = useAppStore((state) => [
        state.isDeleteModalOpen,
        state.setDeleteModalOpen,
        state.fileId,
        state.setFileId,
    ]);

    async function deleteFile() {
        if(!user || !fileId) return;

        try {
            const fileref = ref(storage, `users/${user.id}/files/${fileId}`);
            await deleteObject(fileref).then(() => {
                deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
                    console.log("DELETED");
                });
            }).finally(() => {
                setDeleteModalOpen(false);
                setFileId("");
            });
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(isOpen) => setDeleteModalOpen(isOpen)}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action will permanently delete your file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => setDeleteModalOpen(false)}
          className="px-3 flex-1">
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
          type="submit"
            size={"sm"}
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
