import { create } from "zustand";

interface FileDataState {
  item: string; // Store a single string
  budget: number; // Store budget as a number
  setFileItem: (data: any, budget: number) => void;
  clearFileItem: () => void;
}

const airecommendationData = create<FileDataState>((set) => ({
  item: "",
  budget: 0, // Initialize budget with a default value
  setFileItem: (data, budget) => {
    const stringifiedData =
      typeof data === "string" ? data : JSON.stringify(data);
    set({ item: stringifiedData, budget: budget }); // Update both item and budget
  },
  clearFileItem: () => set({ item: "", budget: 0 }), // Clears the stored string and resets the budget
}));

export default airecommendationData;
