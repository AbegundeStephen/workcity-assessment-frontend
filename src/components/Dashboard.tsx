import React from "react";
import { Users, FolderOpen, CheckCircle, DollarSign } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { mockClients } from "../data/mockClients";
import { mockProjects } from "../data/mockProjects";
const Dashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Clients",
      value: mockClients.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Active Projects",
      value: mockProjects.filter((p) => p.status !== "completed").length,
      icon: FolderOpen,
      color: "text-green-600",
    },
    {
      label: "Completed Projects",
      value: mockProjects.filter((p) => p.status === "completed").length,
      icon: CheckCircle,
      color: "text-purple-600",
    },
    {
      label: "Total Revenue",
      value: `$${mockProjects
        .reduce((acc, p) => acc + p.budget, 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your client projects</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockProjects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="px-6 py-4 flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-500">{project.clientName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <StatusBadge status={project.status} />
                <span className="text-sm text-gray-500">
                  ${project.budget.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
