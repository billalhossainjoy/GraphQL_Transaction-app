import { Outlet } from "react-router-dom";

const AuthRootLayout: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <main className="absolute top-0 bottom-0 left-0 right-0">
        <Outlet />
      </main>
    </div>
  );
};
export default AuthRootLayout;
