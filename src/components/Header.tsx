import React, { useContext } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
const Header: React.FC<{ onToggleSidebar: () => void }> = ({
  onToggleSidebar,
}) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-gray-900">
            Client Project Manager
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-700">
            <User className="w-4 h-4 mr-2" />
            <span>{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-sm text-gray-700 hover:text-gray-900">
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;