import { create } from 'zustand';
import axios from 'axios';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user') || null,
  loading: false,
  error: null,

  
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        'http://localhost:5000/api/auth/login', 
        { email, password },
        { withCredentials: true }
      );

      
      if (response.data.requireReEnable) {
        console.log("User needs re-enablement.");
        set({ loading: false });
        return {
            requireReEnable: true,
            email: response.data.email
        };
    }

      if (response.data.requireVerification) {
        set({ loading: false });
        return { 
          requireVerification: true,
          email: response.data.email 
        };
      }

      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));

      set({
        user: userData,
        isAuthenticated: true,
        loading: false 
      });

      return userData;

    } catch (error) {
      console.error("Auth Store Login Error:", error.response?.data || error);

      
      if (error.response?.status === 403 && error.response.data.requireReEnable) {
          console.log("Redirecting to re-enable page...");
          return {
              requireReEnable: true,
              email: error.response.data.email
          };
      }

      // set({
      //     error: error.response?.data?.error || 'Login failed',
      //     loading: false
      // });
      set({ error: "Email or password is incorrect", loading: false });
      
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      set({ loading: true, error: null });
      
      const response = await axios.post(
        'http://localhost:5000/api/auth/register', 
        { username, email, password }, 
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const userData = response.data.user;

      if (!userData.isVerified) {
        set({ loading: false });
        return { 
          requireVerification: true,
          email: userData.email 
        };
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      set({ 
        user: userData,
        isAuthenticated: true,
        loading: false 
      });
      
      return userData;
    } catch (error) {
      set({ 
        error: error.response?.data?.error || 'Registration failed',
        loading: false 
      });
      throw error;
    }
  },

  googleLogin: async (idToken) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        'http://localhost:5000/api/auth/google-login',
        { idToken },
        { withCredentials: true }
      );
  

      if (response.data.requireReEnable) {
        console.log("User needs re-enablement.");
        set({ loading: false });
        return {
            requireReEnable: true,
            email: response.data.email
        };
    }


      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      set({ user: userData, isAuthenticated: true, loading: false });
  
      return userData;
    } catch (error) {
      console.error("Auth Store Login Error:", error.response?.data || error);

      if (error.response?.status === 403 && error.response.data.requireReEnable) {
          console.log("Redirecting to re-enable page...");
          return {
              requireReEnable: true,
              email: error.response.data.email
          };
      }

      set({
          error: error.response?.data?.error || 'Login failed',
          loading: false
      });

      throw error;
    }
  },

//    checkUserStatus: async () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser) return;

//     try {
//         const response = await axios.get(`http://localhost:5000/api/auth/${storedUser.id}`, {
//             withCredentials: true,
//         });

//         // 🚨 If user is disabled, redirect & log out
//         if (response.data.isDisabled === "disabled") {
//             console.log("🚨 User is disabled. Redirecting and logging out...");
//             window.location.href = "/login"; // ✅ Redirect first

//             setTimeout(async () => {
//                 await useAuthStore.getState().logout(); // ✅ Logout after redirect
//             }, 500);
//         }
//     } catch (error) {
//         console.error("Error checking user status:", error);
//     }
// },

  
  logout: async () => {
    try {
      await signOut(auth);

      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      });
      
      localStorage.removeItem('user');
      
      set({ 
        user: null,
        isAuthenticated: false,
        error: null 
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}));


// window.addEventListener("load", () => {
//   useAuthStore.getState().checkUserStatus();
// });
export default useAuthStore;