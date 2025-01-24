import { LoginSchema, LoginSchemaType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import { FormFieldType } from "@/constants";
import CustomFormField from "@/components/common/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/user/user.resolver";
import toast from "react-hot-toast";

const LoginForm: React.FC = () => {
  const [Login, { loading }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: ["AuthUser"],
  });
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "mdbillalhossainjoy",
      password: "mdbillalhossainjoy",
    },
  });

  const onSubmit = async (LoginInput: LoginSchemaType) => {
    try {
      Login({ variables: { input: LoginInput } }).then(() =>
        toast.success("Login Successfully.")
      );

      toast.success("Login Successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Login faild.");
    }
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
          <Button className="w-full">
            {loading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </div>
      </Form>
    </form>
  );
};
export default LoginForm;
