import { useRef } from "react";
import { Link } from "react-router-dom";
// import { useSearch } from "../../../../../contexts";
import { useSearch } from "@/contexts";
import { useClickOutside } from "@/hooks";

type Props = {};

const Search = (props: Props) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { open, setOpen } = useClickOutside(searchInputRef);
  const { isOpen, setIsOpen } = useSearch();

  const handleOpen = () => {
    setOpen(true);
    setIsOpen(true);
  };

  return (
    <div className="flex-center border border-gray-200 rounded-lg relative">
      <img
        src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
        alt="icon-search"
        className="w-5 h-5 ml-4"
      />
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay"
        className="px-2 outline-none border-none flex-1"
        ref={searchInputRef}
        onFocus={handleOpen}
      />
      <button
        className="flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-['']  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg
  "
      >
        Tìm kiếm
      </button>
      <div
        className={`absolute w-full left-0 top-full border border-gray-200 rounded-t-sm shadow-md bg-white z-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="">
          <Link
            to="/search?q=keyword"
            className="flex-center px-4 font-medium text-[14px]"
          >
            <img
              src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png"
              alt="search-icon"
              className="w-[35px] h-[35px]"
            />
            <p className="flex-1 px-2">Muôn kiếp nhân sinh</p>
          </Link>
          <Link
            to="/search?q=keyword"
            className="flex-center px-4 font-medium text-[14px]"
          >
            <img
              src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png"
              alt="search-icon"
              className="w-[35px] h-[35px]"
            />
            <p className="flex-1 px-2">Muôn kiếp nhân sinh</p>
          </Link>
          <Link
            to="/search?q=keyword"
            className="flex-center px-4 font-medium text-[14px]"
          >
            <img
              src="https://salt.tikicdn.com/ts/upload/e8/aa/26/42a11360f906c4e769a0ff144d04bfe1.png"
              alt="search-icon"
              className="w-[35px] h-[35px]"
            />
            <p className="flex-1 px-2">Muôn kiếp nhân sinh</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Search;
