import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setDeleteModalOpen: (isOpen: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (isOpen: boolean) => void;

  fileId: string | null;
  setFileId: (id: string) => void;

  filename: string;
  setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  fileId: null,
  setFileId: (id: string) => set((state: AppState) => ({ fileId: id })),

  filename: "",
  setFilename: (filename: string) =>
    set((state: AppState) => ({ filename: filename })),

  isDeleteModalOpen: false,
  setDeleteModalOpen: (isOpen: boolean) =>
    set((state: AppState) => ({ isDeleteModalOpen: isOpen })),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (isOpen: boolean) =>
    set((state: AppState) => ({ isRenameModalOpen: isOpen })),
}));
