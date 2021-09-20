import axios from "axios";

export const fetchTopicsAPI = async (size = 10, page = 1) => {
  return await getServerData("/topics", size, page);
};

export const fetchImagesAPI = async (topic = "", size = 100, page = 1) => {
  if (topic === "") {
    console.error("no topic selected");
    return {};
  }
  const data = await getServerData(`/topics/${topic}/images`, size, page);
  return { topic, data };
};

const getServerData = async (route, size, page) => {
  try {
    const url = `${route}?size=${size}&page=${page}`;
    const resp = await axios.get(url);
    if (resp.status !== 200) {
      console.error("received error response from server");
      return [];
    }

    if (resp.data.status !== "ok") {
      console.error("received error response from unsplash server");
      return [];
    }

    return resp.data.data;
  } catch (error) {
    console.error("error receiving data from server:", error);
    return [];
  }
};
