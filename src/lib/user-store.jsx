import create from 'zustand';


const useUserStore = create((set) => ({
  user: {
    id: null,
    name: 'Clara',
    email: '',
    status: 'busy',
    message: 'Your store is a hook! You can put anything in it: primitives, objects, functions. The set function merges state',
    image:'/assets/usertiles/anime-girl.gif'
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({
    user: {
        id: null,
        name: '',
        email: '',
        status: 'offline',
        message: '',
        image:''
    }
  })
}));

export default useUserStore;
