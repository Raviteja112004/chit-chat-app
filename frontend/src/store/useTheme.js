import { create } from "zustand";

 export const useThemes = create((set) =>({
    themes: localStorage.getItem('chat-theme') || "coffee",
    setTheme:(theme)=>{
        localStorage.setItem('chat-theme', theme);
        set({themes:theme});
    }
}))
