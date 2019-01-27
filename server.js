const express = require("express");
const server = express();
const fs = require("fs");
const path = require("path");
const createApp = require("./dist/server.bundle.js");
const renderer = require("vue-server-renderer").createRenderer({
  template: fs.readFileSync("./index.html", "utf-8")
});

server.use("/dist", express.static(path.join(__dirname, "./dist")));

server.get("*", (req, res) => {
  const context = {
    url: req.url,
    title: "vue-ssr-app"
  };

  createApp.default(context).then(
    app => {
      renderer.renderToString(app, context, function(err, html) {
        if (err) {
          if (err.code === 404) {
            res.status(404).end("Page not found");
          } else {
            res.status(500).end("Internal Server Error");
          }
        } else {
          res.end(html);
        }
      });
    },
    err => {
      console.log(err);
    }
  );
});

server.listen(8080);
