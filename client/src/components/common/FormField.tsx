import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import RenderField from "./RenderField";
import { FormFieldType } from "@/constants";
import { SignUpSchema } from "@/schema/auth.schema";
import { cn } from "@/lib/utils";

export interface FormFieldProps<T extends FieldValues> {
  children?: React.ReactNode;
  name: Path<T>;
  control: Control<T>;
  label?: string;
  fieldType: FormFieldType;
  placeholder?: string;
  options?: Options;
  renderskeleton?: (
    field: ControllerRenderProps<T, Path<T>>
  ) => React.ReactNode;
}

const CustomFormField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  const { name, control, label, fieldType } = props;
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && fieldType !== FormFieldType.CHECKBOX && (
            <Label
              className={cn("text-sm w-full text-start text-gray-200", {
                "text-primary": name in SignUpSchema.shape,
              })}
            >
              {label.toUpperCase()}
            </Label>
          )}
          <RenderField props={props} field={field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomFormField;
