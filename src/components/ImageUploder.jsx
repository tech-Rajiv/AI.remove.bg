

function ImageUploder({
  error,
  setError,
  imageUploded,
  setIsLoading,
  clearImage,
  ImageUploadHandler
}) {
  const imageUploderFn = async (e) => {
    setError(null);
    const file = e.target.files[0];
    const validatedImgFile = validateImage(file);
    if (!validatedImgFile) return setError("please add a valid image file");
    console.log("yes its an img file");
    const validateSize = checkImageSize(file);
    if (!validateSize) return setError("image size exceeds the limit");
    try {
      const validateDimensionsOfFile = await validateDimensions(file);
      console.log("vli", validateDimensionsOfFile);
      if (!validateDimensionsOfFile) {
        return setError("image dimensions exceeds the limit");
      }
      setIsLoading(true)
      ImageUploadHandler(file)
    } catch (error) {
      console.log("not good dimensionghr");
      return setError("image dimensions are not valid!");
    }
  };

  const validateDimensions = async (file) => {
    console.log("inside valideor");
    let width;
    let height;
    const img = new Image();
    const result = await new Promise((resolve, reject) => {
      img.onload = () => {
        width = img.width;
        height = img.height;
        console.log(width, height);
        URL.revokeObjectURL(img);
        console.log("check dimensions");
        if (width <= 4000 && height <= 4000) {
          console.log("dimention okay");
          resolve(true);
        } else {
          reject();
        }
      };
      img.src = URL.createObjectURL(file);
    });
    console.log(result, "res");
    return result;
  };

  const validateImage = (file) => {
    if (file && file.type.startsWith("image/")) return file;
  };

  const checkImageSize = (file) => {
    const fileSize = file.size / 1000000;
    const maxSizeInMB = 5;
    if (fileSize < maxSizeInMB) {
      console.log("sizeis valid", fileSize);
      return file;
    }
  };

  return (
    <div className="py-5 ">
      <div className="flex px-5">
        <div
          className={`w-20  h-20 rounded-xl  ${
            imageUploded ? "bg-gray-200" : "bg-purple-100 text-purple-400"
          }`}
        >
          <label
            className="w-full cursor-pointer h-full flex justify-center items-center "
            htmlFor="fileInput"
          >
            {!imageUploded && (
              <input
                onChange={imageUploderFn}
                type="file"
                id="fileInput"
                className="hidden"
              />
            )}

            <p className="text-5xl  ">+</p>
          </label>
        </div>

        <div className="w-20 h-20 relative  rounded-xl   ml-2">
          {imageUploded ? (
            <div className="overflow-hidden rounded-xl w-full h-full">
              <img className="w-full h-full object-cover" src={imageUploded} alt="users image" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl bg-gray-200 w-full h-full"></div>
          )}

          {imageUploded && (
            <button
              onClick={clearImage}
              className="top-[-10px] left-[60px] outline shadow-2xl absolute bg-white rounded-full"
            >
              <i className="ri-delete-bin-6-line text-3xl"></i>
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-500 absolute ml-6 text-sm font-stretch-50% mt-1">
          {error}
        </div>
      )}
    </div>
  );
}

export default ImageUploder;
