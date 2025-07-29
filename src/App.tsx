import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import ProjectList from './components/ProjectList';
import ClientDetailModal from './components/ClientDetailModal';
import LoginForm from './components/LoginForm';
import { Client } from './types';
import './App.css';

function App() {
 const { isAuthenticated } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);

  const handleClientSelect = (client: Client | null) => {
    if (client) {
      setSelectedClient(client);
      setShowClientModal(true);
    } else {
      // Handle add new client
      console.log('Add new client');
    }
  };

  const handleCloseClientModal = () => {
    setShowClientModal(false);
    setSelectedClient(null);
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientList onClientSelect={handleClientSelect} />;
      case 'projects':
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
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Client Detail Modal */}
      {showClientModal && selectedClient && (
        <ClientDetailModal 
          client={selectedClient} 
          onClose={handleCloseClientModal}
        />
      )}
    </div>
  );
};


export default App;
