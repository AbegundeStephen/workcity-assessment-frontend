import React from "react";
import { Link } from "react-router-dom";
import { Client } from "../../types/client.types";
import { formatDate, formatPhone, getInitials } from "../../utils/formatters";
import StatusBadge from "../ui/StatusBadge";
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onView: (client: Client) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold text-lg">
              {getInitials(client.name)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {client.name}
            </h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {client.company}
            </p>
          </div>
        </div>
        <StatusBadge status={client.status} />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <a href={`mailto:${client.email}`} className="hover:text-primary-600">
            {client.email}
          </a>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <a href={`tel:${client.phone}`} className="hover:text-primary-600">
            {formatPhone(client.phone)}
          </a>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Joined {formatDate(client.createdAt)}
        </div>
      </div>

      {client.projectsCount !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">
              {client.projectsCount}
            </span>{" "}
            active projects
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onView(client)}
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
          title="View client">
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => onEdit(client)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
          title="Edit client">
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(client)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
          title="Delete client">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ClientCard;
