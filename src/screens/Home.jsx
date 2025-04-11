import { enhancedcallAPI } from "@/apiCalls/enhancedAPIcall";
import ImageBgRemover from "@/components/ImageBgRemover";
import ImageEnhancer from "@/components/ImageBgRemover";
import ImageUploder from "@/components/ImageUploder";
import React, { useEffect, useState } from "react";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploded, setImageUploded] = useState();
  const [doneRemoving, setDoneRemoving] = useState();
  const [val, setVal] = useState(33);
  const [error, setError] = useState(null);

  const ImageUploadHandler = async (file) => {
    const canFreeUseToday = checkFreeUseToday();
    if (!canFreeUseToday) {
      setError("no credits! please try again tommorrow");
      return;
    }
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

  const [limitRemaning, setLimitRemaining] = useState(2);

  const checkFreeUseToday = () => {
    const today = new Date().toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem("bg_remove_usage")) || {};

    if (data.date !== today) {
      localStorage.setItem(
        "bg_remove_usage",
        JSON.stringify({ date: today, count: 1 })
      );
      setLimitRemaining((prev) => prev - 1);
      return true;
    }

    if (data.count == 0) {
      setLimitRemaining(0);
      return false;
    } else {
      data.count--;
      setLimitRemaining((prev) => prev - 1);
      localStorage.setItem("bg_remove_usage", JSON.stringify(data));
      return true;
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bg_remove_usage")) || {};
    //console.log("data",data)
    const count = typeof data.count === "number" ? data.count : 2;
    setLimitRemaining(count);
    //console.log(typeof data.count === "number")
  }, []);

  const clearImage = () => {
    setImageUploded(null);
    setIsLoading(false);
    setDoneRemoving("");
  };
  return (
    <div className="mt-5">
      <div className="px-2">
        <h1 className="text-center font-bold text-3xl">
          AI Background Remover
        </h1>
        <p className="text-center mt-1">Remove background from any images.</p>
        <p className="text-center">
          Credit remaining per day :{" "}
          <span className="font-semibold">{limitRemaning}</span>
        </p>
      </div>

      <div className="mt-1">
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
