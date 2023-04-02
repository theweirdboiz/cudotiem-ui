import React, { useEffect } from "react";
import * as httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import { usePost } from "~/contexts/postContext";
import { useNavigate } from "react-router-dom";
import { PostType } from "~/types/PostType";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Paginate,
  Table,
} from "~/components";
import {
  useDeleteData,
  useFirebaseImage,
  usePaginate,
  useSearch,
} from "~/hooks";
import { deletePost, getPost, getPosts } from "~/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PER_PAGE = 3;

const PostManage = () => {
  const queryClient = useQueryClient();
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(),
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number | string) => await deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: true,
      });
    },
  });

  const navigator = useNavigate();

  // handle pagination
  const { paginatedData, pageCount, handlePageClick } = usePaginate({
    data: posts as any,
    perPage: PER_PAGE,
  });
  // handle filter data
  const { filteredData, handleSearch } = useSearch({
    data: paginatedData,
    searchKey: "title",
  });
  const { handleDeleteImage } = useFirebaseImage("/posts");

  // handle delete category
  // const { handleDeleteData } = useDeleteData<PostType>({
  //   data: posts as any,
  //   deleteFn: deletePostMutation,
  // });
  const handleDeleteData = async (id: number) => {
    deletePostMutation.mutate(id);
    const postData = await getPost(id);
    if (postData) {
      handleDeleteImage(postData.image);
    }
  };

  return (
    <>
      <DashboardHeading>Quản lý tin đăng</DashboardHeading>
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
          <Button
            to="/manage/add-post"
            classnames="text-blue-500 hover:bg-blue-100"
            height="h-10"
          >
            Tạo tin mới
          </Button>
        </div>
      </div>
      {posts && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Post</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <div className="flex items-center gap-x-2">
                      <img
                        src={
                          post.image ||
                          "https://raw.githubusercontent.com/evondev/react-course-projects/master/monkey-blogging/public/img-upload.png"
                        }
                        className="w-10 h-10 rounded-md"
                        alt=""
                      />
                      <div className="">
                        <h3 className="font-semibold">{post.title}</h3>
                        <time className="text-xs text-gray-400">
                          {post.createdAt}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>{post.categoryId}</td>
                  <td>{post.userId}</td>
                  <td>
                    <LabelStatus status={post.status} />
                  </td>
                  <td>
                    <div className="flex-center gap-x-2.5">
                      <ActionView onClick={() => navigator(`/${post.slug}`)} />
                      <ActionEdit
                        onClick={() =>
                          navigator(`/manage/update-post?id=${post.id}`)
                        }
                      />
                      <ActionDelete onClick={() => handleDeleteData(post.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pageCount={pageCount} onPageChange={handlePageClick} />
        </>
      )}
    </>
  );
};
export default PostManage;
