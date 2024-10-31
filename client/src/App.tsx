import { Route, Routes } from "react-router-dom";
import AuthRootLayout from "./layout/auth.layout";
import AuthPage from "./pages/auth/page";
import DashboardLayout from "./layout/dashboard.layout";
import DashboardPage from "./pages/dashboard/page";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={AuthRootLayout}>
          <Route index Component={AuthPage} />
        </Route>
        <Route path="/dashboard" Component={DashboardLayout}>
          <Route index Component={DashboardPage} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
