import Select from "./Select";
// import Option from './Option'
import Dropdown from "./Dropdown";

interface DropdownInterface extends Dropdown {
  Select: typeof Select;
  // Option: typeof Option;
}

// Dropdown.Select = Select;
// Dropdown.Option = Option

export { Dropdown };

// export { default } from "./Dropdown";
