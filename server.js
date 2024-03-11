const express = require("express");
const app = express();
const videosRoutes = require("./Route/videos"); // import the router
require("dotenv").config();
const cors = require("cors");
const { CORS_ORIGIN, PORT } = process.env;

app.use(cors({ CORS_ORIGIN }));
app.use(express.json());
// register the /videos route to the app
app.use("/videos", videosRoutes);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`listening on port ,' ${PORT || 3003}`);
});
