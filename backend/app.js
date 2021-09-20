require("dotenv").config();
var logger = require("morgan");
const express = require("express");
var axios = require("axios");

const app = express();
const port = 3001;

app.use(logger("dev"));
app.use(express.json());

app.get("/topics", async (req, res, next) => {
  const data = await fetchUnsplashData(
    "/topics",
    req.query.size,
    req.query.page
  );
  res.json(data);
});

app.get("/topics/:topicId/images", async (req, res, next) => {
  const data = await fetchUnsplashData(
    `/topics/${req.params.topicId}/photos`,
    req.query.size,
    req.query.page
  );
  res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const BASEURL = "https://api.unsplash.com";

const fetchUnsplashData = async (route, size = 10, page = 1) => {
  try {
    const url = `${BASEURL}${route}?client_id=${process.env.UNSPLASHKEY}&per_page=${size}`;
    const resp = await axios.get(url);
    if (!resp.status === 200) {
      return { status: "error", error: "received error response from server" };
    }

    return { status: "ok", data: resp.data };
  } catch (error) {
    return { status: "error", error: "error receiving data from server" };
  }
};
