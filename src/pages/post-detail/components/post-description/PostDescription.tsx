import React from "react";
import { Button } from "~/components";

type Props = {
  description?: string;
};

const PostDescription = (props: Props) => {
  const { description } = props;
  return (
    <div className="p-3">
      <h3 className="mb-3 font-semibold text-xl">Mo ta san pham</h3>
      <div
        className="entry-content"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      ></div>
      <Button>Xem them noi dung</Button>
    </div>
  );
};

export default PostDescription;
