import React, { useState } from "react";
import { useGallary } from "~/contexts";
import MainItem from "./MainItem";
import SubItem from "./SubItem";

type Props = {};

const Gallary = (props: Props) => {
  const { mainImage, handleImageClick } = useGallary();

  return (
    <div className="gallary max-w-[460px] w-full mb-3">
      <MainItem src={mainImage}></MainItem>
      <div className="img-container grid grid-cols-5 gap-x-3 px-3">
        <SubItem
          src="https://i.pinimg.com/564x/fb/d1/f0/fbd1f081e6253fdee9fcc28df4bceba3.jpg"
          onClick={handleImageClick}
        />
        <SubItem
          src="https://source.unsplash.com/random"
          onClick={handleImageClick}
        />
        <SubItem
          src="https://i.pinimg.com/736x/1e/e5/1f/1ee51f3d11a0bbeab08cbf7ef1abd926.jpg"
          onClick={handleImageClick}
        />
        <SubItem
          src="https://source.unsplash.com/random"
          onClick={handleImageClick}
        />
        <SubItem
          src="https://i.pinimg.com/736x/1e/e5/1f/1ee51f3d11a0bbeab08cbf7ef1abd926.jpg"
          onClick={handleImageClick}
        />
      </div>
    </div>
  );
};

export default Gallary;
