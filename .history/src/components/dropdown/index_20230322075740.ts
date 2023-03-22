import Select from "./Select";
// import Option from './Option'
import Dropdown, { DropdownType } from "./Dropdown";

interface DropdownInterface extends DropdownType {
  Select: typeof Select;
  // Option: typeof Option;
}

// Dropdown.Select = Select;
// Dropdown.Option = Option
const dropDownwithCustom: DropdownInterface = Dropdown;
dropDownwithCustom.Select = Select;

export { Dropdown };

// export { default } from "./Dropdown";
