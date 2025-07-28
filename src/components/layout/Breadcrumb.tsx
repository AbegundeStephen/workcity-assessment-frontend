import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNameMap: Record<string, string> = {
    dashboard: "Dashboard",
    clients: "Clients",
    projects: "Projects",
    add: "Add",
    edit: "Edit",
    view: "View",
    settings: "Settings",
    analytics: "Analytics",
  };

  const breadcrumbs: BreadcrumbItem[] = [{ name: "Home", href: "/dashboard" }];

  let currentPath = "";
  pathnames.forEach((pathname, index) => {
    currentPath += `/${pathname}`;
    const isLast = index === pathnames.length - 1;
    const name = breadcrumbNameMap[pathname] || pathname;

    breadcrumbs.push({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      href: isLast ? undefined : currentPath,
    });
  });

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.name} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
          {breadcrumb.href ? (
            <Link
              to={breadcrumb.href}
              className="hover:text-gray-700 transition-colors duration-200">
              {index === 0 ? <Home className="h-4 w-4" /> : breadcrumb.name}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{breadcrumb.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
