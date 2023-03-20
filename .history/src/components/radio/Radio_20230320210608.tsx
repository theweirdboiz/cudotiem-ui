import { useController } from "react-hook-form";

interface RadioHookProps {
  control: any;
  name: string;
  value: number | string;
  checked: boolean;
  [key: string]: any;
}

const Radio = ({ control, ...props }: RadioHookProps) => {
  console.log(props);

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
          {...props}
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
