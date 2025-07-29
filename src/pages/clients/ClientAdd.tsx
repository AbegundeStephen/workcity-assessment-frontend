// src/pages/clients/ClientAdd.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateClient } from "../../hooks/useClients";
import { ClientFormData } from "../../types/client.types";
import Layout from "../../components/layout/Layout";
import ClientForm from "../../components/client/ClientForm";
import { ArrowLeft } from "lucide-react";

const ClientAdd: React.FC = () => {
  const navigate = useNavigate();
  const createClientMutation = useCreateClient();

  const handleSubmit = async (data: ClientFormData) => {
    try {
      await createClientMutation.mutateAsync(data);
      navigate("/clients");
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleCancel = () => {
    navigate("/clients");
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/clients")}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the information below to create a new client
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <ClientForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createClientMutation.isLoading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClientAdd;
