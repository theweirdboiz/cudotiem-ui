import { useController } from "react-hook-form";

interface RadioHookProps {
  control: any;
  name: string;
  value: string;
  checked: boolean;
}

const Radio = ({ control, ...props }: RadioHookProps) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
    <label className="cursor-pointer custom-radio">
      <input
        {...field}
        type="radio"
        value={props.value}
        className="hidden"
        checked={props.checked}
      />
      <div className="w-full h-full bg-white rounded-full"></div>
    </label>
  );
};

export default Radio;
