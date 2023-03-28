import Body from "./TableBody";
import BodyRow from "./TableBodyRow";
import Head from "./TableHead";
import HeadRow from "./TableHeadRow";

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white overflow-x-hidden rounded-lg">
      <table>{children}</table>
    </div>
  );
};
Table.Head = Head;
Table.Body = Body;
Table.HeadRow = HeadRow;
Table.BodyRow = BodyRow;
export default Table;
