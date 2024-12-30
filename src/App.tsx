import { ToastContainer } from "react-toastify";
import Header from "./componentes/Header";
import AuthProvider from "./context/AuthContext";
//import Routes from "./config/routes";

import { AppRouter } from "./config/routes";

function App() {
  return (
    <div className="w-full h-screen">
      <AuthProvider>
        <Header />
        <AppRouter />
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
