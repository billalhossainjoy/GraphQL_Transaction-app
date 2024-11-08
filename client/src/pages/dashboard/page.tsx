import TransactionForm from "@/pages/dashboard/transaction.form";
import Chart from "./chart";
import { Loader, LogOut } from "lucide-react";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "@/graphql/user/user.resolver";
import Transactions from "./transactions";
import { GET_AUTH_USER } from "@/graphql/user/user.queries";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [Logout, { loading }] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [GET_AUTH_USER],
  });

  const logoutHandler = async () => {
    try {
      await Logout();
      navigate("/logout-success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" container m-auto">
        <h2 className="font-bold text-center text-white text-7xl mb-6">
          Expence GQL
        </h2>
        <div className="w-full text-center">
          <div className="flex w-full justify-center gap-3 items-center">
            <span className=" font-bold text-xl bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-transparent inline-block">
              Spend wisely, tract wisely
            </span>
            {!loading ? (
              <LogOut className="text-primary" onClick={logoutHandler} />
            ) : (
              <Loader className="animate-spin text-primary" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full m-auto">
          <div className="p-5 m-auto w-[350px]">
            <Chart cutout={100} />
          </div>
          <div className="flex h-full items-center">
            <TransactionForm />
          </div>
        </div>
        <div className="w-full">
          <Transactions />
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
