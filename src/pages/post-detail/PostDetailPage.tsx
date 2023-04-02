import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Post } from "~/components";
import { IconHeart } from "~/components/icon";
import { GallaryProvider } from "~/contexts";
import { PostType } from "~/types/PostType";
import * as httpRequest from "~/ultis/httpRequest";
import PostDescription from "./components/post-description/PostDescription";
import Gallary from "./components/post-gallary/Gallary";
import PostInfo from "./components/post-info/PostInfo";
import PostMeta from "./components/post-meta/PostMeta";
import PostsRelative from "./components/posts-relative/PostsRelative";
import UserContact from "./components/user-contact/UserContact";

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
          <GallaryProvider>
            <Gallary />
          </GallaryProvider>
          {/* infor */}
          <PostMeta />
        </div>
        <UserContact />
      </div>
      {/* Post relative */}
      <PostsRelative />
      {/* Detail */}
      <PostInfo />
      {/* Description */}
      <PostDescription description={postDetail?.content} />
    </div>
  );
};

export default PostDetailPage;
