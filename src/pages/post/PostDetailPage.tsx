import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Post } from "~/components";
import { IconHeart } from "~/components/icon";
import { PostType } from "~/types/PostType";
import httpRequest from "~/ultis/httpRequest";

type Props = {};

const PostDetailPage = (props: Props) => {
  const [postDetail, setPostDetail] = useState<PostType>();
  const { slug } = useParams();

  useEffect(() => {
    const fetchPostDetail = async () => {
      const res = await httpRequest.get<PostType[]>(
        `posts?slug=${slug}&_limit=1`
      );

      setPostDetail(res[0]);
    };
    fetchPostDetail();
  }, []);

  return (
    <div className="rounded-md mb-5 bg-white min-h-screen">
      <div className="flex gap-x-10">
        <div className="flex">
          {/* gallary */}
          <div className="gallary max-w-[460px] w-full">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              className="w-[444px] h-[444px]"
            />
            <div className="img-list grid grid-cols-5 gap-x-3 my-3">
              <img src="https://source.unsplash.com/random" alt="" />
              <img src="https://source.unsplash.com/random" alt="" />
              <img src="https://source.unsplash.com/random" alt="" />
              <img src="https://source.unsplash.com/random" alt="" />
              <img src="https://source.unsplash.com/random" alt="" />
            </div>
          </div>
          {/* infor */}
          <div className="infor flex-1">
            <h3>Không phải sói cũng đừng là cừu</h3>
            <h5>85.000đ</h5>
            <Button
              type="button"
              height="h-10"
              classnames="text-red-300 bg-white border border-current flex-center gap-x-1 hover:bg-red-100"
            >
              <IconHeart />
              Lưu tin
            </Button>
            <span>Tin da duoc kiem duyet</span>
          </div>
        </div>
        <div className="contact mt-3">
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex-center">
              <img
                src="https://source.unsplash.com/random"
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <span>User02123</span>
            </div>
            <h4>sdt:012312312</h4>
            <div className="flex">
              <div>
                <h3>4.5/5 sao</h3>
                <span>30 luot danh gia</span>
              </div>
              <div>39 nguoi theo doi</div>
            </div>
            <div className="flex-center justify-between">
              <Button>Xem nguoi ban</Button>
              <Button>Chat</Button>
            </div>
          </div>
        </div>
      </div>
      {/* Post relative */}
      <div className="grid grid-cols-5">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      {/* Detail */}
      <div className="flex flex-col mb-5 p-3">
        <span>Key: value</span>
        <span>Key: value</span>
        <span>Key: value</span>
        <span>Key: value</span>
      </div>
      {/* Description */}
      <div className="p-3">
        <h3 className="mb-3 font-semibold text-xl">Mo ta san pham</h3>
        <div
          className="entry-content"
          dangerouslySetInnerHTML={{ __html: postDetail?.content || "" }}
        ></div>
        <Button>Xem them noi dung</Button>
      </div>
    </div>
  );
};

export default PostDetailPage;
