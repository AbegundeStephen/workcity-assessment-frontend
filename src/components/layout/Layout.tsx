import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />

        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
