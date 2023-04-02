import { useState } from "react";

type PaginationProps = {
  data: any;
  perPage: number;
};

const usePagination = ({ data, perPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedData = data.slice(
    currentPage * perPage,
    (currentPage + 1) * perPage
  );
  const pageCount = Math.ceil(data.length / perPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return { paginatedData, pageCount, handlePageClick };
};
export default usePagination;
