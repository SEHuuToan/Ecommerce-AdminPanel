import {create} from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        username: string;
    } | null;
    token: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("token"),
    login: (username: string, token: string) => {
        localStorage.setItem("token", token); // Lưu token vào localStorage
        set({
          isAuthenticated: true,
          user: { username },
          token: token,
        });
      },
    logout: () => {
        localStorage.removeItem("token");
        set({
            isAuthenticated: false,
            user: null,
            token: null
        });
    }
}));

export default useAuthStore;
