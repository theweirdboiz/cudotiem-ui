import React from "react";
import ReactPaginate from "react-paginate";
import { PaginateProps } from "./type";

const Paginate = (props: PaginateProps) => {
  const { filteredData, onPageChange, pageCount } = props;

  return (
    <>
      <ReactPaginate
        previousLabel={"<"}
        previousClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
        pageRangeDisplayed={5}
        pageLinkClassName={
          "px-3 py-1 rounded border border-gray-200  hover:bg-blue-100"
        }
        pageCount={pageCount}
        onPageChange={onPageChange}
        nextLabel={">"}
        nextClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
        marginPagesDisplayed={2}
        containerClassName={"box-center mt-3 gap-x-3"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"text-blue-400 font-semibold"}
      />
      {!filteredData || (filteredData.length === 0 && <>Not have data</>)}
    </>
  );
};

export default Paginate;
