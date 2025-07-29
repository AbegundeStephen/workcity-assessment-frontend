import React from "react";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

const StatusBadge: React.FC<{
  status: string;
  type?: "client" | "project";
}> = ({ status, type = "project" }) => {
  const getStatusConfig = () => {
    if (type === "client") {
      return status === "active"
        ? { color: "bg-green-100 text-green-800", icon: CheckCircle }
        : { color: "bg-red-100 text-red-800", icon: XCircle };
    }

    switch (status) {
      case "completed":
        return { color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800", icon: Clock };
      case "pending":
        return { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle };
      default:
        return { color: "bg-gray-100 text-gray-800", icon: AlertCircle };
    }
  };

  const { color, icon: Icon } = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
};


export default StatusBadge;