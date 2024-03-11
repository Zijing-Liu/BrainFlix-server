const videos = require("../data/videos.json");
const videoDetails = require("../data/video-details.json");
const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const placeholderImg = "/images/Upload-video-preview.jpg";
const placeholderChannel = "Dalia Bennu";

router.get("/:id", (req, res) => {
  const videoDetailWithId = videoDetails.find((vd) => vd.id === req.params.id);
  if (videoDetailWithId) {
    res.json({ data: videoDetailWithId });
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});

router.get("/", (req, res) => {
  res.json({ data: videos });
});

router.post("/", (req, res) => {
  const newVideo = {
    id: uniqid(),
    title: req.title,
    channel: placeholderChannel,
    image: placeholderImg,
  };
  videos.push(newVideo);
  res.json({ status: "success", message: "request recieved" }), 200;
});
// router.post(":id/comments", (req, res) => {
//   res.json({ message: "success" });
// });

module.exports = router;
