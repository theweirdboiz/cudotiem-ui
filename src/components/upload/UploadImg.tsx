import React, { Fragment } from "react";

interface Props {
  className?: string;
  progress?: number;
  imageLink?: string | "";
  handleDeleteImage?: () => void;
  [key: string]: any;
}

const UploadImg: React.FC<Props> = ({
  className = "",
  progress = 0,
  imageLink = "",
  handleDeleteImage = () => {},
  ...rest
}) => {
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed border-blue-300 w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
    >
      <input type="file" className="hidden" onChange={() => {}} {...rest} />
      {progress !== 0 && !imageLink && (
        <div className="absolute z-10 w-16 h-16 border-8 border-blue-400 rounded-full loading border-t-transparent animate-spin"></div>
      )}
      {imageLink?.length <= 0 && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="https://raw.githubusercontent.com/evondev/react-course-projects/master/monkey-blogging/public/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {imageLink?.length > 0 && (
        <Fragment>
          <img src={imageLink} className="object-cover w-full h-full" alt="" />
          <button
            type="button"
            className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {imageLink.length <= 0 && (
        <div
          className="absolute bottom-0 left-0 w-10 h-1 transition-all bg-blue-400 image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  );
};
export default UploadImg;
