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
        className="flex items-center justify-between p-4 bg-white border border-blue-400 text-gray-700 rounded-xl cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{label}</span>
      </div>

      <div
        className={`absolute z-10 top-full left-0 w-full rounded-lg bg-white ${
          open ? "" : "opacity-0 invisible"
        }`}
      >
        {data &&
          data.map((item) => (
            <div
              className="p-5 cursor-pointer hover:bg-blue-200"
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
