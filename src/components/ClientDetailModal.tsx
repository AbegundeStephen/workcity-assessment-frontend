import React from "react";
import StatusBadge from "./StatusBadge";
import { X, DollarSign, Calendar, FolderOpen } from "lucide-react";
import { mockProjects } from "@/data/mockProjects";
const ClientDetailModal: React.FC<{ client: Client; onClose: () => void }> = ({
  client,
  onClose,
}) => {
  const clientProjects = mockProjects.filter((p) => p.clientId === client.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Client Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Client Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {client.name}
              </h3>
              <StatusBadge status={client.status} type="client" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Company
                </label>
                <p className="text-gray-900">{client.company}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{client.email}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">{client.phone}</p>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Status
                </label>
                <StatusBadge status={client.status} type="client" />
              </div>
              {client.address && (
                <div className="md:col-span-2">
                  <label className="block font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <p className="text-gray-900">{client.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Projects ({clientProjects.length})
            </h3>

            {clientProjects.length > 0 ? (
              <div className="space-y-3">
                {clientProjects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {project.title}
                      </h4>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>${project.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FolderOpen className="mx-auto h-8 w-8 mb-2 opacity-50" />
                <p>No projects found for this client</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Close
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
            Edit Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;
