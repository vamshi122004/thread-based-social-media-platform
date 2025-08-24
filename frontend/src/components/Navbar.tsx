import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Plus, User, LogOut, Shield, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/Stores/useAuth";

const Navbar = () => {
  const authUser = useAuth((state) => state.authUser);
  const adminUser = useAuth((state) => state.adminUser);
  const logout = useAuth((state) => state.logout);
  const adminlogout = useAuth((state) => state.adminlogout);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    if (adminUser) {
      await adminlogout();
      navigate("/admin/login");
    } else {
      await logout();
      navigate("/login");
    }
  };

  const showBackButton =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/admin/login";

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  T
                </span>
              </div>
              <span className="font-bold text-xl">ThreadWave</span>
            </Link>
          </div>

          {/* Right side: Back button + Auth/Admin buttons */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            {(authUser || adminUser) && (
              <>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>

                {authUser && (
                  <Link to="/create-thread">
                    <Button
                      variant="default"
                      size="sm"
                      className="gradient-primary text-primary-foreground border-0"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New Thread
                    </Button>
                  </Link>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden sm:block">
                        {adminUser ? "Admin" : authUser?.username}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-56">
                    {!adminUser && (
                      <DropdownMenuItem onClick={() => navigate("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    )}

                    {adminUser && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate("/admin")}>
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
