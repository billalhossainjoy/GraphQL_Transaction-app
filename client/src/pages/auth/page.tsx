
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login.form";
import SignUpForm from "./signup.form";

const AuthPage: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="rounded-xl max-w-xl w-full p-3 space-y-6">
        <h2 className="font-bold text-center text-white text-7xl mb-6">
          Expence GQL
        </h2>
        <span className="text-primary flex justify-center items-center gap-3 font-bold text-xl">
          Spend wisely, tract wisely
        </span>
        <Tabs defaultValue="login">
          <TabsList className="tab-triggers">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="tab-content">
            <div className="bg-gray-100 p-5 rounded-lg">
              <LoginForm />
            </div>
          </TabsContent>
          <TabsContent value="signup" className="tab-content">
            <div className="bg-gray-100 p-5 rounded-lg">
              <SignUpForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default AuthPage;
