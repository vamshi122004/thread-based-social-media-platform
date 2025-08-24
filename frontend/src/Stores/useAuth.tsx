import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstanace } from "@/axios/axios";
import { isAxiosError } from "axios";

interface AuthUser {
  _id: string;
  username: string;
  email: string;
}

interface AdminUser {
  _id: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthState {
  authUser: AuthUser | null;
  adminUser: AdminUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isAdminLoggingIn: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  adminlogin: (data: LoginData) => Promise<void>;
  adminlogout: () => Promise<void>;
}

// ✅ Fixed utility to extract error messages
const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    return (
      (error.response?.data as { message?: string })?.message || error.message
    );
  }
  if (error instanceof Error) return error.message;
  return String(error);
};

const localUser = localStorage.getItem("authUser")
  ? JSON.parse(localStorage.getItem("authUser")!)
  : null;

export const useAuth = create<AuthState>((set) => ({
  authUser: localUser,
  adminUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAdminLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstanace.get<AuthUser>("/auth/check", {
        withCredentials: true,
      });
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch {
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstanace.post<AuthUser>("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Account created successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstanace.post<AuthUser>("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Logged in successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstanace.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
      toast.success("Logged out successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  },

  adminlogin: async (data: LoginData) => {
    set({ isAdminLoggingIn: true });
    try {
      const res = await axiosInstanace.post<AdminUser>("/admin/login", data);
      set({ adminUser: res.data });
      localStorage.setItem("adminUser", JSON.stringify(res.data));
      toast.success("Admin logged in successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ isAdminLoggingIn: false });
    }
  },

  adminlogout: async () => {
    try {
      await axiosInstanace.post("/admin/logout");
      set({ adminUser: null });
      localStorage.removeItem("adminUser");
      toast.success("Admin logged out successfully");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  },
}));
