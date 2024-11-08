import { Navigate, Route, Routes } from "react-router-dom";
import AuthRootLayout from "./layout/auth.layout";
import AuthPage from "./pages/auth/page";
import DashboardLayout from "./layout/dashboard.layout";
import DashboardPage from "./pages/dashboard/page";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/user/user.queries";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import { Loader } from "lucide-react";
import LogoutPage from "./pages/logout";

const App: React.FC = () => {
  const { loading, data } = useQuery(GET_AUTH_USER);

  if (loading)
    return (
      <div className="fixed inset-0">
        <div className="flex justify-center items-center w-full h-full">
          <Loader className="animate-spin flex justify-center items-center text-primary w-10 h-10" />
        </div>
      </div>
    );
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            !data?.authUser ? <AuthRootLayout /> : <Navigate to="/dashboard" />
          }
        >
          <Route index element={<AuthPage />} />
        </Route>
        <Route
          path="/dashboard"
          element={data?.authUser ? <DashboardLayout /> : <Navigate to="/" />}
        >
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/logout-success" element={<LogoutPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
