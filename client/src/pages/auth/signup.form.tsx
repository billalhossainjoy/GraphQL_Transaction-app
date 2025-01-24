import { SignUpSchema, SignUpSchemaType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import CustomFormField from "@/components/common/FormField";
import { FormFieldType, GenderOptions } from "@/constants";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl } from "@/components/ui/form";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "@/graphql/user/user.resolver";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const SignUpForm: React.FC = () => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      gender: "male",
    },
  });
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    refetchQueries: ["AuthUser"],
  });

  const onSubmit = async (SignUpInput: SignUpSchemaType) => {
    try {
      signup({
        variables: {
          input: SignUpInput,
        },
      });

      toast.success("Signup Successfully")
    } catch (err) {
      console.log(error);
      toast.error("Signup Error.")
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <div className="space-y-5">
          <CustomFormField<SignUpSchemaType>
            name="name"
            placeholder="type your full name"
            label="Full Name"
            control={form.control}
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField<SignUpSchemaType>
            name="username"
            label="Username"
            placeholder="type username"
            control={form.control}
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField<SignUpSchemaType>
            name="password"
            label="Password"
            placeholder="********"
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
          />
          <CustomFormField<SignUpSchemaType>
            name="gender"
            label="Gender"
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            renderskeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex gap-3"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {GenderOptions.map((option) => (
                    <Label
                      key={option.value}
                      className="flex gap-2 justify-center items-center p-4 bg-gray-300 rounded-lg"
                      htmlFor={option.value}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <span>{option.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />

          <Button className="w-full">{loading ? <Loader /> : "Sign Up"}</Button>
        </div>
      </Form>
    </form>
  );
};
export default SignUpForm;
