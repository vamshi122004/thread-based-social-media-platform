import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

// ✅ Zustand Auth Store
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ThreadList from "./pages/ThreadList";
import ThreadDetail from "./pages/ThreadDetail";
import CreateThread from "./pages/CreateThread";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import { useAuth } from "./Stores/useAuth";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  const { adminUser, authUser, checkAuth, isCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth(); // ✅ check auth on load
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AuthProvider>
            <Navbar />
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/admin/admindashboard"
                  element={adminUser ? <AdminDashboard /> : <Navigate to="/" />}
                />

                {/* 🔒 Protected Routes */}
                <Route
                  path="/threads"
                  element={authUser ? <ThreadList /> : <Navigate to="/login" />}
                />
                <Route
                  path="/thread/:id"
                  element={
                    authUser ? <ThreadDetail /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/create-thread"
                  element={
                    authUser ? <CreateThread /> : <Navigate to="/login" />
                  }
                />

                {/* ✅ Auth Routes (if not already logged in) */}
                <Route
                  path="/login"
                  element={!authUser ? <Login /> : <Navigate to="/threads" />}
                />
                <Route
                  path="/register"
                  element={
                    !authUser ? <Register /> : <Navigate to="/threads" />
                  }
                />

                {/* Admin route (not secured here) */}
                <Route
                  path="/admin/login"
                  element={
                    !adminUser ? (
                      <AdminLogin />
                    ) : (
                      <Navigate to="/admin/admindashboard" />
                    )
                  }
                />

                {/* 404 fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
