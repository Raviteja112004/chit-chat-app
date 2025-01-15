import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE=== "development"?"http://localhost:8000": "/";
export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp: false,
    isLogingIn:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    isCheckingAuth:true,
    socket:null,

    checkAuth: async(data) =>{
        try {
            const res = await  axiosInstance.get('/check');

            set({authUser:res.data})
            get().connectSocket();

        } catch (error) {
            set({authUser:null});

        }
        finally{
           set({isCheckingAuth:false}) 
        }
    },

    signup: async(data) =>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post('/signup', data);
            toast.success('Account created successfully');
            get().connectSocket();
            set({authUser:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        set({isLogingIn:true});
        try {
            const res = await axiosInstance.post('/login',data);
            set({authUser:res.data});
            toast.success('Logged in successfully');
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLogingIn:false})
        }
    },
    logout: async ()=>{
        try {
            await axiosInstance.post('/logout');
            set({authUser:null});
            toast.success('Logged Out successfully');
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }

    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put('/update-profile', data);
          if (res && res.data) {
            set({ authUser: res.data });
            toast.success('Profile Photo Updated');
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          console.log('Error updating profile:', error.message); // Debugging log
          toast.error(error.response?.data?.message || 'Error updating profile');
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
       connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));