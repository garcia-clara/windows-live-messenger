import create from 'zustand';


const useContactStore = create((set) => ({
  contact: {
    id: null,
    name: 'Contact',
    email: '<contact@hotmail.fr>',
    status: 'online',
    message: 'Hello',
    image:'../assets/usertiles/038243241b9f018c426fe0e6cca9558492794682.png'
  },
  setContact: (contact) => set({ contact }),
}));

export default useContactStore;
