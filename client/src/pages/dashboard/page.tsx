import TransactionForm from "@/pages/dashboard/transaction.form";
import Chart from "./chart";

const DashboardPage: React.FC = () => {
  return (
    <div className=" container m-auto">
      <h2 className="font-bold text-center text-white text-7xl mb-6">
        Expence GQL
      </h2>
      <div className="w-full text-center">
        <span className=" justify-center items-center gap-3 font-bold text-xl bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-transparent inline-block ">
          Spend wisely, tract wisely
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full m-auto">
        <div className="p-5 w-8/12 m-auto">
          <Chart cutout={100} />
        </div>
        <div className="flex h-full items-center">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
