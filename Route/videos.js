const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const placeholderImg = "/images/Upload-video-preview.jpg";
const placeholderChannel = "Dalia Bennu";
const fs = require("fs");
const videosPath = "./data/videos.json";
// route with method of getting the video details with an id
router.get("/:id", (req, res) => {
  const videoDetailWithId = videoDetails.find((vd) => vd.id === req.params.id);
  if (videoDetailWithId) {
    res.json({ data: videoDetailWithId });
  } else {
    res.status(404).json({ error: "Video not found" });
  }
});
// get all videos
router.get("/", async (req, res) => {
  fs.readFile(videosPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }
    res.json({ data: JSON.parse(data) });
  });
});

// upload a new video
router.post("/", (req, res) => {
  let currentVideos = [];
  // read the existing file
  fs.readFile(videosPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    } else {
      console.log(data);
      currentVideos = data;
    }
  });
  console.log("should not be empty", currentVideos);

  const newVideo = {
    id: uniqid(),
    title: req.title,
    channel: placeholderChannel,
    image: placeholderImg,
  };
  currentVideos.push(newVideo);
  console.log(currentVideos);
  fs.writeFile(videosPath, JSON.stringify(currentVideos), (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error uploading a video");
      resturn;
    }
    res.send("Video upload success");
  });
});

module.exports = router;
