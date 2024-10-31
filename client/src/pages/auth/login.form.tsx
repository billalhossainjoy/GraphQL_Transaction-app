import { LoginSchema, LoginSchemaType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { FormFieldType } from "@/constants";
import CustomFormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const LoginForm: React.FC = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="space-y-5">
          <CustomFormField<LoginSchemaType>
            name="username"
            label="Username"
            placeholder="type username"
            control={form.control}
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField<LoginSchemaType>
            name="password"
            label="Password"
            placeholder="********"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
          />

          <Button className="w-full">Sign Up</Button>
        </div>
      </Form>
    </form>
  );
};
export default LoginForm;
