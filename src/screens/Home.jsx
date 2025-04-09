import { enhancedcallAPI } from "@/apiCalls/enhancedAPIcall";
import ImageBgRemover from "@/components/ImageBgRemover";
import ImageEnhancer from "@/components/ImageBgRemover";
import ImageUploder from "@/components/ImageUploder";
import React, { useState } from "react";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploded, setImageUploded] = useState();
  const [doneRemoving, setDoneRemoving] = useState();
  const [val, setVal] = useState(33);
  const [error, setError] = useState(null);

  const ImageUploadHandler = async (file) => {
    const image = URL.createObjectURL(file);
    setImageUploded(image);
    setTimeout(() => {
      setVal(66);
    }, 500);

    try {
      const enhancedImage = await enhancedcallAPI(file);
      console.log("sucess", enhancedImage);
      setVal(100);
      setIsLoading(false);
      setDoneRemoving(enhancedImage);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const compressImg = async (image) => {
    console.log("compressing");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("compresed");
    return image;
  };

  const clearImage = () => {
    setImageUploded(null);
    setIsLoading(false);
    setDoneRemoving("");
  };

  return (
    <div className="mt-5 ">
      <div className="px-2">
        <h1 className="text-center font-bold text-3xl">AI Baground Remover</h1>
        <p className="text-center mt-1">
          Remove baground from any images, remaning credit 3
        </p>
      </div>

      <div className="mt-2 ">
        <ImageUploder
          clearImage={clearImage}
          setIsLoading={setIsLoading}
          ImageUploadHandler={ImageUploadHandler}
          imageUploded={imageUploded}
          setError={setError}
          error={error}
        />
        <ImageBgRemover
          val={val}
          isLoading={isLoading}
          doneRemoving={doneRemoving}
          setDoneRemoving={setDoneRemoving}
          imageUploded={imageUploded}
        />
      </div>
      <div className="mt-10 flex justify-center"></div>
    </div>
  );
}

export default Home;
