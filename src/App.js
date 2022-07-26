import "./App.css";
import { AuthProvider } from "./context/auth";
import { ChatProvider } from "./context/chat";
import { AppRoutes } from "./routes/AppRoutes.js";

function App() {
  return (
    <div>
      <AuthProvider>
        <ChatProvider>
          <AppRoutes />
        </ChatProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
