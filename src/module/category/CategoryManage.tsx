import { useEffect } from "react";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Paginate,
  Table,
} from "~/components";
import DashboardSearch from "~/layouts/dashboard/components/DashboardSearch";
import DashboardHeading from "~/layouts/dashboard/components/DashboardHeading";
import { useSearch, useDeleteData, usePaginate } from "~/hooks";
import { useNavigate } from "react-router-dom";
import { useCategory } from "~/contexts/categoryContext";
import { CategoryStatus } from "~/config";
import { CategoryType } from "~/types/CategoryType";
import httpRequest from "~/ultis/httpRequest";
import {
  deleteCategory,
  getAllCategories,
  getCategory,
} from "~/services/categoryService";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PER_PAGE = 3;

const CategoryManage = () => {
  const queryClient = useQueryClient();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number | string) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
        exact: true,
      });
    },
  });

  // others
  const navigator = useNavigate();
  // const { categories, setCategories } = useCategory();
  // handle pagination
  const { paginatedData, pageCount, handlePageClick } = usePaginate({
    data: categories,
    perPage: PER_PAGE,
  });
  // handle filter data
  const { filteredData, handleSearch } = useSearch({
    data: paginatedData,
    searchKey: "name",
  });
  // handle delete category
  // const { handleDeleteData } = useDeleteData<CategoryType>({
  //   data: categories,
  //   setData: setCategories,
  // });
  const handleDeleteData = async (id: number) => {
    const categoryData = await getCategory(id);
    if (categoryData) {
      const result = await Swal.fire({
        title: "Khoan đã",
        text: "Bạn thật sự muốn xóa?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3086d6d4",
        cancelButtonColor: "#f44343d7",
        confirmButtonText: "Có, hãy xóa!",
        cancelButtonText: "Hủy",
      });

      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        deleteCategoryMutation.mutate(id);
      }
    }
  };

  // side effect
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const categoriesData = await httpRequest.get<CategoryType[]>(
  //       "categories"
  //     );
  //     setCategories(categoriesData);
  //   };
  //   fetchCategories();
  // }, []);

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
                      <LabelStatus status={CategoryStatus.APPROVED} />
                    )}
                    {category.status === 2 && (
                      <LabelStatus status={CategoryStatus.PENDING} />
                    )}
                    {category.status === 3 && (
                      <LabelStatus status={CategoryStatus.REJECTED} />
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
