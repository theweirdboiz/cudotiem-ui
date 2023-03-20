import Dropdown from "./Dropdown";
import Option from "./Option";
import Search from "./Search";
import Select from "./Select";
import List from "./List";

interface DropdownProps {
  Option: typeof Option;
  Search: typeof Search;
  Select: typeof Select;
  List: typeof List;
}

const DropdownWithComponents = Dropdown as unknown as DropdownProps;
DropdownWithComponents.Option = Option;
DropdownWithComponents.Search = Search;
DropdownWithComponents.Select = Select;
DropdownWithComponents.List = List;

export { DropdownWithComponents as Dropdown };
