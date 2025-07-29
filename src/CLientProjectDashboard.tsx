import { AuthProvider } from "./context/AuthContext";
import App from "./App";
const ClientProjectDashboard: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default ClientProjectDashboard;
