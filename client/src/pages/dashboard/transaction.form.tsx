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

const TransactionForm: React.FC = () => {
  const form = useForm<TransactionType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      paymentType: "cash",
      category: "saving",
      date: new Date(),
      location: "",
    },
  });

  const onSubmit = (data: TransactionType) => {
    console.log(data);
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
              placeholder="New York"
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
          <Button className="w-full">Add Transaction</Button>
        </div>
      </Form>
    </form>
  );
};
export default TransactionForm;
