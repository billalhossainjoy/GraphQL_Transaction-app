import { Outlet } from "react-router-dom";
import backgoundImage from "/background-image.jpg";

const AuthRootLayout: React.FC = () => {
  return (
    <div className="h-screen w-full">
      <div className="w-full h-full blur-sm">
        <img src={backgoundImage} alt="" className="w-full h-full object-none" />
      </div>
      <main className="absolute top-0 bottom-0 left-0 right-0">
        <Outlet />
      </main>
    </div>
  );
};
export default AuthRootLayout;
