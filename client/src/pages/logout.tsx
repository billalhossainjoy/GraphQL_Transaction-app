import { Button } from "@/components/ui/button";

const LogoutPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-6">
      <h1 className="text-secondary text-6xl">Thanks you for use this app</h1>
      <Button>
        <a href="/">Login</a>
      </Button>
    </div>
  );
};
export default LogoutPage;
