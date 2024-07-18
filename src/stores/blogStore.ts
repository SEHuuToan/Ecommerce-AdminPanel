import { create } from "zustand";

interface BlogData {
    title: string;
    header: string;
    body1: string;
    body2: string;
    body3: string;
    footer: string;
    image: string[];
    status: boolean;
  }
interface BlogStore {
    openAddModal: boolean;
    openUpdateModal: boolean;
    setOpenAddModal: (openAddModal: boolean) => void;
    setOpenUpdateModal: (openUpdateModal: boolean) => void;
    blogData: BlogData;
    resetInputField: () => void;
}
const initialBlogData: BlogData = {
    title: "",
    header: "",
    body1: "",
    body2: "",
    body3: "",
    footer: "",
    image: [],
    status: true,
  };
const useBlogStore = create<BlogStore>((set) => ({
    openAddModal: false,
    openUpdateModal: false,
    setOpenAddModal: (openAddModal) => {
        set({ openAddModal });
        if (openAddModal) {
          set({ blogData: initialBlogData });
        }
      },
      setOpenUpdateModal: (openUpdateModal) => {
        set({ openUpdateModal });
        if (openUpdateModal) {
          set({ blogData: initialBlogData });
        }
      },
    blogData: initialBlogData,
    resetInputField: () => set({ blogData: initialBlogData }),
}))
// image va setImage dang sai fix lai sau

export default useBlogStore;