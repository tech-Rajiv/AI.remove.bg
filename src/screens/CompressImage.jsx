import ImageUploder from "@/components/ImageUploder";
import React, { useState } from "react";
import imageCompression from 'browser-image-compression';

function CompressImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploded, setImageUploded] = useState();
  const [val, setVal] = useState(33);
  const [error, setError] = useState(null);
  const [range, setRange] = useState(20);
  const [compressionStart, setCompressionStart] = useState(false);
  const [compressed, setCompressed] = useState(null);
  const [imageBefore, setImageBefore] = useState();
  const [beforeSize, setBeforeSize] = useState()
  const [afterSize, setAfterSize] = useState()
  const ImageUploadHandler = (file) => {
    setImageBefore(file);
    setImageUploded(URL.createObjectURL(file));
  };

  const startCompress = async () => {
    setCompressed()
    setCompressionStart(true);
    if (!imageUploded) return setError("no image selected");
    setError();
    console.log("starting");
    const maxSizeMb = parseFloat((range / 1024).toFixed(3));
    const compressedImage = await imageCompressionFn(maxSizeMb, imageBefore);
    setBeforeSize(Math.round(imageBefore.size/1000))
    setAfterSize(Math.round(compressedImage.size/1000))
    setCompressed(URL.createObjectURL(compressedImage))
    //setcompressed(compressedImage);
  };

  const imageCompressionFn = async (size, file) => {
    
    const options = {
      maxSizeMB: size,
      useWebWorker: true,
      maxWidthOrHeight: 1280,
    };
    console.log(options)
    try {
      const imageCompressed = imageCompression(file,options)
      return imageCompressed

    } catch (error) {
      console.log("err wjile compressing")
      return false;
    }
  };

  const clearImage = () => {
    setIsLoading(false);
    setImageUploded();
  };

  return (
    <div className="px-5">
      <div className="mt-10">
        <h1 className="text-center font-bold text-3xl">Image Size Reducer</h1>
        <p className="text-center mt-1">get your image size reduced for free!</p>
      </div>

      <div className="mt-5">
        <ImageUploder
          error={error}
          setError={setError}
          isLoading={isLoading}
          clearImage={clearImage}
          setIsLoading={setIsLoading}
          ImageUploadHandler={ImageUploadHandler}
          imageUploded={imageUploded}
        />
      </div>

      <div className="px-5 flex justify-center flex-col items-center gap-3 mt-2">
        <h2 className="text-lg">
          size under: <span className="font-semibold">{range}kbps</span>
        </h2>
        <input
          type="range"
          min={20}
          max={400}
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="w-60 h-2 bg-purple-300 rounded-lg appearance-none cursor-pointer
              
               [&::-webkit-slider-thumb]:appearance-none 
               [&::-webkit-slider-thumb]:w-4 
               [&::-webkit-slider-thumb]:h-4 
               [&::-webkit-slider-thumb]:bg-white 
               [&::-webkit-slider-thumb]:border 
               [&::-webkit-slider-thumb]:border-purple-500 
               [&::-webkit-slider-thumb]:rounded-full 
               [&::-webkit-slider-thumb]:shadow-md 
              "
        />
      </div>

      <div className="mt-2 flex justify-center"></div>
      <div>
        <button
          onClick={startCompress}
          className="flex py-3 mt-3 cursor-pointer justify-center w-full text-purple-800 rounded-lg font-semibold hover:bg-purple-300/80 outline text-lg "
        >
          Compress
        </button>
      </div>
      {compressionStart && (
        <div className="flex mt-5 h-82 overflow-hidden w-82 max-w-96 justify-center  items-center rounded-xl outline outline-purple-300 ">
          {compressed ? (
            <img
              className="w-full h-full object-cover"
              src={compressed}
              alt="compressed image"
            />
          ) : (
            <div className=" w-full h-full flex justify-center items-center  text-2lg">
              please wait!
            </div>
          )}
        </div>
      )}
      <div className="mb-10">
        {compressed && (
          <div>
            <a
              href={compressed}
              download="compressed-image.jpg" 
              className="flex py-3 mt-3 cursor-pointer justify-center w-full text-purple-800 rounded-lg font-semibold hover:bg-purple-300/80 outline text-lg "
            >
              Download Compressed Image
            </a>
            <p className="mt-1 text-center">size reduced from {beforeSize}kbps to {afterSize}kbps</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompressImage;
