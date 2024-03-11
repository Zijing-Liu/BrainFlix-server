const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const placeholderImg = "/images/Upload-video-preview.jpg";
const placeholderChannel = "Dalia Bennu";
const fs = require("fs");
const videosPath = "./data/videos.json";
const videoDetailsPath = "./data/video-details.json";
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

// route with method of getting the video details with an id
router.get("/:id", (req, res) => {
  fs.readFile(videoDetailsPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }
    videoDetails = JSON.parse(data);

    const videoDetailWithId = videoDetails.find(
      (vd) => vd.id === req.params.id
    );
    if (videoDetailWithId) {
      res.json({ data: videoDetailWithId });
    } else {
      res.status(404).json({ error: "Video not found" });
    }
  });
});

// upload a new video
router.post("/", (req, res) => {
  // read the existing file
  fs.readFile(videosPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.send("err");
      return;
    }
    let currentVideos = [];
    try {
      // parse the existing video data as JSON
      currentVideos = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
      res.status(500).send("Error parsing data file");
      return;
    }

    const newVideo = {
      id: uniqid(),
      title: req.body.title,
      channel: placeholderChannel,
      image: placeholderImg,
    };

    // Add the new video to the list of current videos
    currentVideos.push(newVideo);

    // Write the updated list of videos back to the file
    fs.writeFile(
      videosPath,
      JSON.stringify(currentVideos, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          res.status(500).send("Error uploading a video");
          return;
        }
        res.send("Video upload success");
      }
    );
  });
});

module.exports = router;
