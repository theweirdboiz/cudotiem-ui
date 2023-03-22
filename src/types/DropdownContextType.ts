export interface DropdownContextType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}
