import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClients, useDeleteClient } from "../../hooks/useClients";
import { Client } from "../../types/client.types";
import { CLIENT_STATUS_OPTIONS, SORT_OPTIONS } from "../../utils/constants";
import Layout from "../../components/layout/Layout";
import ClientCard from "../../components/client/ClientCard";
import ClientTable from "../../components/client/ClientTable";
import SearchFilter from "../../components/forms/SearchFilter";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { Plus, Grid, List, Trash2 } from "lucide-react";

const ClientList: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState("createdAt:desc");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    client: Client | null;
  }>({ isOpen: false, client: null });

  const itemsPerPage = 12;

  // Parse sort
  const [sortField, sortDirection] = sortBy.split(":");

  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery || undefined,
    sort: sortBy,
    filter: Object.keys(filters).length > 0 ? filters : undefined,
  };

  // Hooks
  const {
    data: clientsResponse,
    isLoading,
    error,
    refetch,
  } = useClients(queryParams);
  const deleteClientMutation = useDeleteClient();

  // Filter options for the search component
  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: CLIENT_STATUS_OPTIONS,
    },
  ];

  // Event handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewClient = (client: Client) => {
    navigate(`/clients/${client._id}`);
  };

  const handleEditClient = (client: Client) => {
    navigate(`/clients/${client._id}/edit`);
  };

  const handleDeleteClick = (client: Client) => {
    setDeleteModal({ isOpen: true, client });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.client) {
      try {
        await deleteClientMutation.mutateAsync(deleteModal.client._id);
        setDeleteModal({ isOpen: false, client: null });
        refetch();
      } catch (error) {
        // Error handling is done in the mutation
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, client: null });
  };

  // Loading state
  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">
            Error loading clients. Please try again.
          </p>
          <Button onClick={() => refetch()} className="mt-4">
            Retry
          </Button>
        </div>
      </Layout>
    );
  }

  const clients = clientsResponse?.data || [];
  const pagination = clientsResponse?.pagination;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your clients and their information
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link to="/clients/add">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
              filters={filters}
              onFilterChange={handleFilterChange}
              placeholder="Search clients by name, email, or company..."
              filterOptions={filterOptions}
            />
          </div>

          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 text-sm ${
                  viewMode === "grid"
                    ? "bg-primary-50 text-primary-700 border-primary-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title="Grid view">
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 text-sm border-l ${
                  viewMode === "table"
                    ? "bg-primary-50 text-primary-700 border-primary-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                title="Table view">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {pagination && (
          <div className="text-sm text-gray-600">
            Showing {clients.length} of {pagination.total} clients
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <ClientCard
                    key={client._id}
                    client={client}
                    onView={handleViewClient}
                    onEdit={handleEditClient}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <ClientTable
                clients={clients}
                onView={handleViewClient}
                onEdit={handleEditClient}
                onDelete={handleDeleteClick}
              />
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteCancel}
          title="Delete Client">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Delete {deleteModal.client?.name}?
                </h3>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. All associated projects will
                  also be affected.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={handleDeleteCancel}
                disabled={deleteClientMutation.isLoading}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteConfirm}
                loading={deleteClientMutation.isLoading}
                disabled={deleteClientMutation.isLoading}>
                Delete Client
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default ClientList;
