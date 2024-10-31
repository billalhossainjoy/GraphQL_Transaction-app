import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Input } from "../ui/input";
import { FormControl } from "../ui/form";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { FormFieldProps } from "./FormField";
import { FormFieldType } from "@/constants";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";

interface RenderFieldProps<T extends FieldValues> {
  props: FormFieldProps<T>;
  field: ControllerRenderProps<T, Path<T>>;
}

const RenderField = <T extends FieldValues>({
  props,
  field,
}: RenderFieldProps<T>) => {
  const { fieldType, placeholder, renderskeleton, options } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input {...field} placeholder={placeholder} className="input" />
        </FormControl>
      );
    case FormFieldType.NUMBER: {
      return (
        <FormControl>
          <Input
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
            placeholder={placeholder}
            type="number"
            className="input"
          />
        </FormControl>
      );
    }
    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            type="password"
            className="input"
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <Select value={field.value} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger className="bg-gray-200 text-black text-sm">
              <SelectValue />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.toUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <Label className="flex gap-3">
            <Checkbox />
            {props.label}
          </Label>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return renderskeleton && renderskeleton(field);
    case FormFieldType.DATE:
      return (
        <div className="w-full flex bg-white rounded-lg justify-center items-center gap-3 px-2">
          <FormControl>
            <DatePicker selected={field.value} onChange={field.onChange} />
          </FormControl>
          <Calendar className="text-gray-700"/>
        </div>
      );
  }
};

export default RenderField;
