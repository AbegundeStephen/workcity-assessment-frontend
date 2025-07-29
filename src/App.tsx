import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ClientList from "./components/ClientList";
import ProjectList from "./components/ProjectList";
import ClientDetailModal from "./components/ClientDetailModal";
import { mockClients } from "./data/mockClients";
import LoginForm from "./components/LoginForm";
import ClientFormModal from "./components/ClientFormModal";
import { Client } from "./types";
import "./App.css";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);
  console.log("App render - isAuthenticated:", isAuthenticated);
  console.log("App render - user:", user);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showClientFormModal, setShowClientFormModal] = useState(false);

  const handleCloseClientModal = () => {
    setShowClientModal(false);
    setSelectedClient(null);
  };

  const handleClientSelect = (client: Client | null) => {
    if (client) {
      setSelectedClient(client);
      setShowClientModal(true);
    } else {
      setEditingClient(null); // null = adding new
      setShowClientFormModal(true);
    }
  };

  const handleClientEdit = (client: Client) => {
    setEditingClient(client);
    setShowClientFormModal(true);
  };

  const handleClientDelete = (clientId: string) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "clients":
        return (
          <ClientList
            clients={clients}
            onClientSelect={handleClientSelect}
            onClientEdit={handleClientEdit}
            onClientDelete={handleClientDelete}
          />
        );
      case "projects":
        return <ProjectList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>

      {/* Client Detail Modal */}
      {showClientModal && selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          onClose={handleCloseClientModal}
        />
      )}
      {showClientFormModal && (
        <ClientFormModal
          client={editingClient}
          onClose={() => {
            setShowClientFormModal(false);
            setEditingClient(null);
          }}
          onSave={(newOrUpdatedClient) => {
            setClients((prev) => {
              const exists = prev.find((c) => c.id === newOrUpdatedClient.id);
              if (exists) {
                return prev.map((c) =>
                  c.id === newOrUpdatedClient.id ? newOrUpdatedClient : c
                );
              } else {
                return [...prev, newOrUpdatedClient];
              }
            });
            setShowClientFormModal(false);
            setEditingClient(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
