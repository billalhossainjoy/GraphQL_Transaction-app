import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import {
  TransactionSchema,
  TransactionType,
} from "@/schema/transaction.schema";
import { Form } from "../../components/ui/form";
import CustomFormField from "../../components/common/FormField";
import {
  CategoryOptions,
  FormFieldType,
  PaymentTypeOptions,
} from "@/constants";
import { Button } from "../../components/ui/button";
import { useMutation } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/graphql/transaction/transaction.resolver";
import toast from "react-hot-toast";
import {
  GET_TRANSACTIONS,
  GET_TRANSCTION_STATISTICS,
} from "@/graphql/transaction/transaction.queries";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  transaction?: Transaction;
}

const TransactionForm: React.FC<Props> = ({ transaction }) => {
  const navigate = useNavigate();
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [GET_TRANSACTIONS, GET_TRANSCTION_STATISTICS],
  });
  const [updateTransaction, { loading: updateLoading }] = useMutation(
    UPDATE_TRANSACTION,
    {
      refetchQueries: [GET_TRANSACTIONS,GET_TRANSCTION_STATISTICS],
    }
  );

  const form = useForm<TransactionType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      description: transaction?.description || "",
      amount: transaction?.amount || 0,
      paymentType: transaction?.paymentType || "cash",
      category: transaction?.category || "saving",
      date: (transaction?.date && new Date(+transaction.date)) || new Date(),
      location: transaction?.description || "",
    },
  });

  const onSubmit = (input: TransactionType) => {
    try {
      if (!transaction) {
        createTransaction({ variables: { input } });
        form.reset();
        toast.success("Transaction created successfully!");
      } else {
        updateTransaction({
          variables: { input: { transactionId: transaction.id, ...input } },
        });
        navigate("/dashboard");
        toast.success("Transaction update successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Transaction create failed!");
    }
  };

  return (
    <form
      className="text-white w-full px-5 py-3"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <div className=" space-y-3">
          <CustomFormField<TransactionType>
            name="description"
            label="Transaction"
            placeholder="Rent"
            control={form.control}
            fieldType={FormFieldType.INPUT}
          />
          <div className="grid grid-cols-3 gap-3   ">
            <CustomFormField<TransactionType>
              name="paymentType"
              label="Payment Type"
              control={form.control}
              options={PaymentTypeOptions}
              fieldType={FormFieldType.SELECT}
            />
            <CustomFormField<TransactionType>
              name="category"
              label="Category"
              placeholder="Expence"
              control={form.control}
              options={CategoryOptions}
              fieldType={FormFieldType.SELECT}
            />
            <CustomFormField<TransactionType>
              name="amount"
              label="Amount{$}"
              placeholder="2000"
              control={form.control}
              fieldType={FormFieldType.NUMBER}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CustomFormField<TransactionType>
              name="location"
              label="Location"
              placeholder="Dhaka"
              control={form.control}
              fieldType={FormFieldType.INPUT}
            />
            <CustomFormField<TransactionType>
              name="date"
              label="Date"
              placeholder="MM/DD/YYYY"
              control={form.control}
              fieldType={FormFieldType.DATE}
            />
          </div>
          {!transaction ? (
            <Button className="w-full">
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                "Add Transaction"
              )}
            </Button>
          ) : (
            <Button className="w-full">
              {updateLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Update Transaction"
              )}
            </Button>
          )}
        </div>
      </Form>
    </form>
  );
};
export default TransactionForm;
