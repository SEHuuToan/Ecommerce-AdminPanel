import {create} from 'zustand';
import {axiosLogout} from '../utils/axiosUtils';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        username: string;
    } | null;
    token: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
}

// const useAuthStore = create<AuthState>((set) => ({
//     isAuthenticated: false,
//     user: null,
//     token: localStorage.getItem("token"),
//     login: (username: string, token: string) => {
//         localStorage.setItem("token", token); // Lưu token vào localStorage
//         set({
//           isAuthenticated: true,
//           user: { username },
//           token: token,
//         });
//       },
//     logout: async () => {
//         try {
//             await axiosLogout('logout');
//             localStorage.removeItem('token');
//             set({
//                 isAuthenticated: false,
//                 user: null,
//                 token: null,
//             });
//         } catch (error) {
//             console.error('Logout error:', error);
//         }
//     }
// }));
const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!localStorage.getItem('accessToken'),
    user: null,
    token: localStorage.getItem('accessToken'),
    login: (username: string, token: string) => {
        localStorage.setItem('accessToken', token);
        set({
          isAuthenticated: true,
          user: { username },
          token: token,
        });
    },
    logout: async () => {
        try {
            await axiosLogout();
            localStorage.removeItem('accessToken');
            set({
                isAuthenticated: false,
                user: null,
                token: null,
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}));


export default useAuthStore;
