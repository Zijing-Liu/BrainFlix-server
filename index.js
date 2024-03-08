const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`listening on port ,' ${PORT}`);
});
