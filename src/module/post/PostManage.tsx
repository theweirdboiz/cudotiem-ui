import UserType from "~/types/UserType";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import httpRequest from "~/ultis/httpRequest";
import DashboardHeading from "~/layouts/DashboardLayout/components/DashboardHeading";
import { userRole, userStatus } from "~/config";
import { usePost } from "~/contexts/postContext";
import { useNavigate } from "react-router-dom";
import { storage } from "~/firebase-app/firebase-config";
import { PostType } from "~/types/PostType";
import { deleteObject, ref } from "firebase/storage";
import {
  ActionDelete,
  ActionEdit,
  ActionView,
  Button,
  LabelStatus,
  Table,
} from "~/components";

const PER_PAGE = 3;

const PostManage = () => {
  /* A hook that is used to get the users from the context. */
  const { posts, setPosts } = usePost();

  /* A hook that is used to navigate to a new location. */
  const navigator = useNavigate();

  /* A hook that is used to perform side effects in function components. */
  useEffect(() => {
    const fetchPosts = async () => {
      const postRes = await httpRequest.get<PostType[]>("/posts");
      setPosts(postRes);
    };
    fetchPosts();
  }, []);

  const handleDeleteImg = (imgLink?: string) => {
    const imageRef = ref(storage, imgLink);
    deleteObject(imageRef)
      .then(() => {
        console.log("remove image successfully");
      })
      .catch((err) => {
        console.log("can not delete image");
      });
  };

  const handleDeletePost = async (postId: number | null) => {
    Swal.fire({
      title: "Khoan đã",
      text: "Bạn thật sự muốn xóa user này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3086d6d4",
      cancelButtonColor: "#f44343d7",
      confirmButtonText: "Có, hãy xóa!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const postData = await httpRequest.get<PostType>(`/posts/${postId}`);
        postData?.image && handleDeleteImg(postData.image);
        await httpRequest.delete(`/posts/${postId}`).then(async () => {
          await httpRequest.get<PostType[]>("/posts").then((res) => {
            setPosts(res);
            /**
             * It takes a number and returns a React component
             * @param {number | null} status - number | null
             * @returns A React component.
             */
            Swal.fire("Deleted!", "Your posts has been deleted.", "success");
          });
        });
      }
    });
  };

  const renderLabelStatus = (status: number | null) => {
    switch (status) {
      case userStatus.ACTIVED:
        return <LabelStatus type={userStatus.ACTIVED}>Actived</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type={userStatus.PENDING}>Pending</LabelStatus>;
      case userStatus.BANED:
        return <LabelStatus type={userStatus.BANED}>Banned</LabelStatus>;
      default:
        break;
    }
  };

  const renderLabelRole = (status: number | null) => {
    switch (status) {
      case userRole.ADMIN:
        return "ADMIN";
      case userRole.MOD:
        return "MODERATER";
      case userRole.USER:
        return "USER";
      default:
        return "NOT";
    }
  };

  // filter & pagination
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const indexOfLast = (currentPage + 1) * PER_PAGE;
  const indexOfFirst = indexOfLast - PER_PAGE;

  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected);
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  };

  const filteredData = currentPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashboardHeading>Users</DashboardHeading>
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
          <Button to="/manage/add-post">Add new post</Button>
        </div>
      </div>
      {posts.length > 0 && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Post</th>
                <th>Category</th>
                <th>Author</th>
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
                    <div className="flex-center gap-x-2.5">
                      <ActionView onClick={() => navigator(`/${post.slug}`)} />
                      <ActionEdit />
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id as number)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={"<"}
            previousClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
            pageRangeDisplayed={5}
            pageLinkClassName={
              "px-3 py-1 rounded border border-gray-200  hover:bg-blue-100"
            }
            pageCount={Math.ceil(posts.length / PER_PAGE)}
            onPageChange={handlePageClick}
            nextLabel={">"}
            nextClassName="px-3 py-1 rounded border border-gray-200 hover:bg-blue-100 cursor-pointer"
            marginPagesDisplayed={2}
            containerClassName={"box-center mt-3 gap-x-3"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            activeClassName={"text-blue-400 font-semibold"}
          />
        </>
      )}
      {!filteredData ||
        (filteredData.length === 0 && <>Not have any category</>)}
    </>
  );
};

export default PostManage;
