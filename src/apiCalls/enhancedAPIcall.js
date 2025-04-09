import axios from "axios";

const API_KEY = "wxiinuvab9y5h84pl";
const BASE_URL = "https://techhk.aoscdn.com/";

export const enhancedcallAPI = async (file) => {
  try {
    const taskId = await uploadingFn(file);

    const enhancedImg = await looping(taskId);
    console.log("lpping done", enhancedImg);
    return enhancedImg;
  } catch (error) {
    console.log("error wile fetching");
  }
};

async function uploadingFn(file) {
  try {
    const formData = new FormData();
    formData.append("image_file", file);
    const { data } = await axios.post(
      `${BASE_URL}api/tasks/visual/segmentation`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );
    console.log(data);
    if (data?.data?.task_id) return data.data.task_id;
  } catch (error) {
    console.log("failed to upload");
  }
}

async function enhancedImgFn(taskId) {
  try {
    const formData = new FormData();
    formData.append("task_id", taskId);
    const { data } = await axios.get(
      `${BASE_URL}api/tasks/visual/segmentation/${taskId}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-KEY": API_KEY,
        },
      }
    );
    console.log(data);
    if (data?.data?.image) return data.data.image;
  } catch (error) {
    console.log("failed to fetch");
  }
}

async function looping(taskId, retry = 0) {
  const result = await enhancedImgFn(taskId);
  if (result) return result;

  console.log("processing", retry);
  if (retry > 10) {
    console.log("retrying", retry);
    return alert("failed to fetch");
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return looping(taskId, retry++);
}

//ee2077fa-c819-4e19-ab69-bcfa600b9ede
//7151aa85-f4e6-4e4d-942f-cd18a66ed544
