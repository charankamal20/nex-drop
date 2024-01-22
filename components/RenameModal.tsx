"use client"

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";


function RenameModal() {
    const {user} = useUser();
    const [input, setInput] = useState("");

    const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
      useAppStore((state) => [
        state.isRenameModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.filename,
      ]);


    return (
        <div>
            
        </div>
    );
}

export default RenameModal;