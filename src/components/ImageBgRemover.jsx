import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";

function ImageBgRemover({ val, isLoading, doneRemoving, imageUploded }) {


  return (
    <section className="w-full mt-1 max-w-[400px] px-5">
      <div className="flex h-82 overflow-hidden w-82 max-w-96 justify-center  items-center rounded-xl outline outline-purple-300 ">
        {!imageUploded && !isLoading && !doneRemoving && (
          <div className=" w-full object-cover h-full flex justify-center items-center  text-2lg">
            no image to preview
          </div>
        )}

        {isLoading && imageUploded && (
          <div className=" w-28">
            <Progress value={val} />
          </div>
        )}
        {doneRemoving && !isLoading && (
          <div className="w-full h-full object-center">
            <img src={doneRemoving} className="w-full h-full" alt="" />
          </div>
        )}
      </div>

      <div className="mt-5">
        {doneRemoving && !isLoading && (
          <div className="flex bg-purple-200 w-full text-purple-800 rounded-lg font-semibold hover:bg-purple-300/80 outline text-lg ">
            <a href={doneRemoving} className="w-full text-center h-full  py-3">
              Download Image
            </a>
          </div>
        )}
        
      </div>
    </section>
  );
}

export default ImageBgRemover;
