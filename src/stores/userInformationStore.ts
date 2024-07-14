import {create} from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        username: string;
    } | null;
    login: (username: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: (username: string) => {
        set({
            isAuthenticated: true,
            user: { username }
        });
    },
    logout: () => {
        set({
            isAuthenticated: false,
            user: null
        });
    }
}));

export default useAuthStore;
