import { create } from "zustand";

interface BlogData {
    closeModal: boolean;
    setCloseModal: (closeModal: boolean) => void;
}
const useBlogStore = create<BlogData>((set) => ({
    closeModal: false,
    setCloseModal: (closeModal) => set({ closeModal }),
}))
// image va setImage dang sai fix lai sau

export default useBlogStore;