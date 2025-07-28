import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Users,
  FolderOpen,
  Plus,
  BarChart3,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: false,
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      current: false,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: FolderOpen,
      current: false,
    },
    {
      name: "Add Client",
      href: "/clients/add",
      icon: Plus,
      current: false,
    },
    {
      name: "Add Project",
      href: "/projects/add",
      icon: Plus,
      current: false,
    },
  ];

  const adminItems = [
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      current: false,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: false,
    },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
            <h2 className="text-white text-lg font-semibold">CM Dashboard</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      isActive
                        ? "bg-primary-100 text-primary-700 border-r-2 border-primary-700"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }>
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              );
            })}

            {/* Admin-only items */}
            {user?.role === "admin" && (
              <>
                <div className="border-t border-gray-200 my-4" />
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </p>
                {adminItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          isActive
                            ? "bg-primary-100 text-primary-700 border-r-2 border-primary-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`
                      }>
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </>
            )}
          </nav>

          {/* User info at bottom */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
