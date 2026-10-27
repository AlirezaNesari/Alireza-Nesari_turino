import { create } from 'zustand'

type State = { open: boolean; show: () => void; hide: () => void }
export const useAuthModal = create<State>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}))
