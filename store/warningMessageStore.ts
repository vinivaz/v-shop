import { create } from 'zustand';

type WarningMessageStore = {
  visible: boolean;
  message: string;
  details: string;
  show: (message: string, details: string) => void;
  hide: () => void;
}

export const useWarningMessageStore = create<WarningMessageStore>((set) => ({
  visible: false,
  message: "",
  details: "",
  show: (message: string, details: string) => set({visible: true, message, details}),
  hide: () => set({visible: false, message: "", details: ""})
}))