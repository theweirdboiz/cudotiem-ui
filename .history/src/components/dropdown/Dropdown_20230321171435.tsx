import { ReactNode, useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutside";

interface DropdownProps {
  control: any;
  setValue: any;
  name: string;
  children: ReactNode;
  dropdownLabel?: string;
}

const Dropdown = ({
  control,
  setValue,
  name,
  children,
  dropdownLabel = "Select your job",
}: DropdownProps) => {
  const dom = useRef(null);
  const [label, setLabel] = useState(dropdownLabel);
  const { open, setOpen } = useClickOutSide(dom);

  const dropdownValue = useWatch({
    control,
    name: "job",
    defaultValue: "", // default value before the render
  });

  const handleClickDropdownItem = (e: any) => {
    setValue(name, e.target.dataset.value);
    setOpen(false);
    setLabel(e.target.textContent);
  };

  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);

  return (
    <div className="relative" ref={dom}>
      <div
        className="flex items-center justify-between p-4 bg-white border border-blue-400 font-medium text-sm  rounded-xl cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
      </div>

      <div
        className={`absolute z-10 top-full left-0 w-full rounded-lg bg-white overflow-hidden ${
          open ? "" : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default Dropdown;
