// useGlobalSearch.ts
import { create } from "zustand";
import { SearchEnum } from "../common/enum";

interface SearchStateT {
  inputValue: {
    value?: string;
    type?: SearchEnum;
  };
  setInputValue: (value?: string, type?: SearchEnum) => void;
}

export const useGlobalSearch = create<SearchStateT>((set) => ({
  inputValue: { value: "", type: SearchEnum.DASHBOARD },
  setInputValue: (value, type) =>
    set((state) => ({
      inputValue: {
        ...state.inputValue,
        ...(value !== undefined ? { value } : {}),
        ...(type !== undefined ? { type } : {}),
      },
    })),
}));
