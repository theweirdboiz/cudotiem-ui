import { useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutside";

interface DropdownProps {
  control: any;
  setValue: any;
  name: string;
  data: any[];
  dropdownLabel?: string;
}

const Dropdown = ({
  control,
  setValue,
  name,
  data,
  dropdownLabel = "Select your job",
}: DropdownProps) => {
  const dom = useRef(null);
  const { open, setOpen } = useClickOutSide(dom);
  const dropdownValue = useWatch({
    control,
    name: "job",
    defaultValue: "", // default value before the render
  });
  console.log("dropdownValue", dropdownValue);
  const handleClickDropdownItem = (e: any) => {
    setValue(name, e.target.dataset.value);
    setOpen(false);
    setLabel(e.target.textContent);
  };
  const [label, setLabel] = useState(dropdownLabel);
  useEffect(() => {
    if (dropdownValue === "") setLabel(dropdownLabel);
  }, [dropdownValue]);
  return (
    <div className="relative" ref={dom}>
      <div
        className="flex items-center justify-between p-5 bg-white border rounded-lg cursor-pointer border-gray100"
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-lg bg-white ${
          open ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => (
          <div
            className="p-5 cursor-pointer hover:bg-gray-100"
            onClick={handleClickDropdownItem}
            data-value={item.value}
            key={item.id}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dropdown;
