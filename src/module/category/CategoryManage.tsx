import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Paginate,
  Table,
} from "~/components";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import DashboardSearch from "~/layouts/DashboardLayout/components/DashboardSearch";
import { useNavigate } from "react-router-dom";
import { useCategory } from "~/contexts/categoryContext";
import { status } from "~/config";
import { CategoryType } from "~/types/CategoryType";
import useDeleteData from "~/hooks/useDeleteData";
import usePagination from "~/hooks/usePaginate";
import useSearch from "~/hooks/useSearch";

const PER_PAGE = 3;

const CategoryManage = () => {
  // others
  const navigator = useNavigate();
  const { categories, setCategories } = useCategory();
  // handle pagination
  const { paginatedData, pageCount, handlePageClick } = usePagination({
    data: categories,
    perPage: PER_PAGE,
  });
  // handle filter data
  const { filteredData, handleSearch } = useSearch({
    data: paginatedData,
    searchKey: "name",
  });
  // handle delete category
  const { handleDeleteData } = useDeleteData<CategoryType>({
    data: categories,
    setData: setCategories,
  });

  // side effect
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await httpRequest.get<CategoryType[]>(
        "categories"
      );
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <DashboardHeading>Categories</DashboardHeading>
      <div className="flex items-center justify-between">
        <DashboardSearch handleSearch={handleSearch} />
        <div className="flex-center justify-end my-5">
          <Button to="/manage/add-category">Create category</Button>
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
                  <td className="font-semibold">{category.name}</td>
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
                        onClick={() => handleDeleteData(category.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
};
export default CategoryManage;
