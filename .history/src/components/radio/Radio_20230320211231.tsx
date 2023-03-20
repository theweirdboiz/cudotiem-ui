import { useController } from "react-hook-form";

interface RadioHookProps {
  control: any;
  name: string;
  value: number | string;
  checked: boolean;
  [key: string]: any;
}

const Radio = ({ control, ...props }: RadioHookProps) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: props.value,
  });
  return (
    <>
      <label htmlFor={props.id}>{props.children}</label>
      <label className="cursor-pointer custom-radio">
        <input
          {...field}
          id={props.id}
          type="radio"
          value={props.value}
          className="hidden"
          checked={props.checked}
        />
        <div className="w-full h-full bg-white rounded-full"></div>
      </label>
    </>
  );
};

export default Radio;
