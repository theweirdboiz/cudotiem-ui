import { ChangeEvent } from "react";

export interface DashboardSearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}
