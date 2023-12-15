const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
app.use(cors());
app.get("/api", (req, res) => {
  if (req.query.key == "vcapi2023") {
    if (req.url === "/favicon.ico") {
      res.end();
    }
    const json = fs.readFileSync("count.json", "utf-8");
    const obj = JSON.parse(json);
    if (req.query.type == "new-page-visit") {
      obj.newpageviews += 1;
    }
    if (req.query.type == "visit") {
      obj.visit += 1;
    }
    const newJSON = JSON.stringify(obj);
    fs.writeFileSync("count.json", newJSON);
    res.send(newJSON);
  } else {
    res.end();
  }
});
app.listen(3030, () => {
  console.log("server is running ....");
});
