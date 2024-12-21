import { create } from 'zustand';

const useClientStore = create((set) => ({
    clients: [],
    setClients: (clients) => set({ clients }),
}));

export default useClientStore;
