import { GET_TRANSACTIONS } from "@/graphql/transaction/transaction.queries";
import { useQuery } from "@apollo/client";
import TransactionCard from "./transactionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TransactionForm from "./transaction.form";

type GetTransaction = {
  transactions: Transaction[];
};

const Transactions: React.FC = () => {
  const navigate = useNavigate();
  const [updateDialoag, setUpdateDialoag] = useState(false);
  const [params] = useSearchParams();
  const { data } = useQuery<GetTransaction>(GET_TRANSACTIONS);

  useEffect(() => {
    if (params.get("updateTransaction")) {
      setUpdateDialoag(true);
    } else {
      setUpdateDialoag(false);
    }
  }, [params]);

  const dialogChangeHandler = () => {
    setUpdateDialoag(false);
    navigate("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 gap-3 m-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.transactions?.map((transaction) => (
        <TransactionCard transaction={transaction} key={transaction.id} />
      ))}
      <Dialog open={updateDialoag} onOpenChange={() => dialogChangeHandler()}>
        <DialogContent className="bg-primary/50">
          <DialogTitle className="text-white w-full text-center">
            Update form
          </DialogTitle>
          <DialogDescription>
            <TransactionForm
              transaction={data?.transactions.find(
                (transaction) =>
                  transaction.id === params.get("updateTransaction")
              )}
            />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Transactions;
