import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthRootLayout from "./layout/auth.layout";
import AuthPage from "./pages/auth/page";
import DashboardLayout from "./layout/dashboard.layout";
import DashboardPage from "./pages/dashboard/page";
import { useQuery } from "@apollo/client";
import { GET_AUTH_USER } from "./graphql/user/user.queries";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_AUTH_USER);

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
          path="/"
          element={
            !data?.authUser ? <AuthRootLayout /> : <Navigate to="/dashboard" />
          }
        >
          <Route index Component={AuthPage} />
        </Route>
        <Route
          path="/dashboard"
          element={data?.authUser ? <DashboardLayout /> : <Navigate to="/" />}
        >
          <Route index Component={DashboardPage} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
