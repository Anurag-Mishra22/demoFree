import { create } from "zustand";

interface FileDataState {
  item: string; // Store a single string
  setFileItem: (data: any) => void;
  clearFileItem: () => void;
}

const aiSearchData = create<FileDataState>((set) => ({
  item: "",
  setFileItem: (data) => {
    const stringifiedData =
      typeof data === "string" ? data : JSON.stringify(data);
    set({ item: stringifiedData });
  },
  clearFileItem: () => set({ item: "" }), // Clears the stored string
}));

export default aiSearchData;
