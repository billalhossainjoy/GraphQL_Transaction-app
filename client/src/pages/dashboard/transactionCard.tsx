import { Card } from "@/components/ui/card";
import { GET_TRANSACTIONS } from "@/graphql/transaction/transaction.queries";
import { DELETE_TRANSACTION } from "@/graphql/transaction/transaction.resolver";
import { cn } from "@/lib/utils";
import { useMutation } from "@apollo/client";
import { Edit, Loader, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  transaction: Transaction;
}

const TransactionCard: React.FC<Props> = ({ transaction }) => {
  const navigate = useNavigate();
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS],
  });
  const date = new Date(+transaction.date);
  const deleteHandler = (id: string) => {
    try {
      deleteTransaction({ variables: { transactionId: id } }).then(() => {
        toast.success("Transaction deleted successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={cn("p-3 ")}>
      <div className="font-semibold">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl capitalize">
            {transaction.category}
          </h1>
          <div className="flex text-primary">
            <Edit
              className="w-5 h-5 cursor-pointer"
              onClick={() =>
                navigate(`/dashboard?updateTransaction=${transaction.id}`)
              }
            />
            {!loading ? (
              <Trash2
                className="w-5 h-5 cursor-pointer"
                onClick={() => deleteHandler(transaction.id)}
              />
            ) : (
              <Loader className="animate-spin" />
            )}
          </div>
        </div>
        <p className="text-sm capitalize">{transaction.description}</p>
        <p className="text-sm capitalize">Amount: {transaction.amount}</p>
        <p className="text-sm capitalize">
          Payment Type: {transaction.paymentType}
        </p>
        <p className="text-sm capitalize">
          Date:{" "}
          <span className="text-primary font-bold">
            {date.toLocaleDateString()}
          </span>
        </p>
      </div>
    </Card>
  );
};
export default TransactionCard;
