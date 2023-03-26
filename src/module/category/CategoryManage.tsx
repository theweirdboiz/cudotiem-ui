import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "~/components";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import { useNavigate } from "react-router-dom";
import { useCategory } from "~/contexts/categoryContext";
import { status } from "~/config";
import { CategoryType } from "~/types/CategoryType";

const PER_PAGE = 3;

const CategoryManage = () => {
  const { categories, setCategories } = useCategory();
  const [currentPage, setCurrentPage] = useState<number>(0);

  const navigator = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await httpRequest.get<CategoryType[]>(
        "categories"
      );
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // Get current posts
  const indexOfLast = (currentPage + 1) * PER_PAGE;
  const indexOfFirst = indexOfLast - PER_PAGE;

  const currentCategories = categories.slice(indexOfFirst, indexOfLast);

  // handle events
  // Change page
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const handleDeleteCateogry = async (categoryId: number | undefined) => {
    Swal.fire({
      title: "Khoan đã",
      text: "Bạn thật sự muốn xóa danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3086d6d4",
      cancelButtonColor: "#f44343d7",
      confirmButtonText: "Có, hãy xóa!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const newCategories: CategoryType[] = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(newCategories);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
      setFilterData([]);
    });
  };

  const filteredData = currentCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <DashboardHeading>Categories</DashboardHeading>
      <div className="flex items-center justify-between">
        <div className="flex-center border border-gray-200 w-full max-w-xl rounded-lg relative">
          <img
            src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
            alt="icon-search"
            className="w-5 h-5 ml-4"
          />
          <input
            type="text"
            placeholder="Bạn tìm gì hôm nay"
            className="px-2 outline-none border-none flex-1"
            onChange={handleSearch}
          />
          <button
            className="flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-['']  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg
    "
          >
            Tìm kiếm
          </button>
        </div>
        <div className="flex-center justify-end my-5">
          <Button>Create category</Button>
        </div>
      </div>
      {filteredData && filteredData.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData.map((category) => (
                <tr key={category?.id}>
                  <td>{category?.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <span className="italic text-gray-400">
                      {category.slug}
                    </span>
                  </td>
                  <td>
                    {category.status === 1 && (
                      <LabelStatus type={status.APPROVED}>Approved</LabelStatus>
                    )}
                    {category.status === 2 && (
                      <LabelStatus type={status.PENDING}>Pending</LabelStatus>
                    )}
                    {category.status === 3 && (
                      <LabelStatus type={status.REJECTED}>Rejected</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex-center gap-x-2.5">
                      <ActionView />
                      <ActionEdit
                        onClick={() =>
                          navigator(`/manage/update-category?id=${category.id}`)
                        }
                      />
                      <ActionDelete
                        onClick={() => handleDeleteCateogry(category.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <ReactPaginate
        previousLabel={"<"}
        previousClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
        pageRangeDisplayed={5}
        pageLinkClassName={
          "px-3 py-1 rounded border border-gray-200  hover:bg-blue-100"
        }
        pageCount={Math.ceil(categories.length / PER_PAGE)}
        onPageChange={handlePageClick}
        nextLabel={">"}
        nextClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
        marginPagesDisplayed={2}
        containerClassName={"box-center mt-3 gap-x-3"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"text-blue-400 font-semibold"}
      />
      {!filteredData ||
        (filteredData.length === 0 && <>Not have any category</>)}
    </>
  );
};

export default CategoryManage;
