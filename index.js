import fs from "fs";
import http from "http";
import url from "url";
import slugify from "slugify";

const posts = fs.readFileSync("data.json", "utf8");
const str = slugify("Hello World", { lower: true });
console.log(str);

fs.writeFileSync("message.txt", "this is new line");
console.log("ტექსტი წარმატებით დაემატა!");

const server = http.createServer((req, res) => {
  const { id } = url.parse(req.url, true).query;
  const { pathname } = url.parse(req.url, true);
  console.log("id aris :", id);

  if (pathname === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("Home Page");
  } else if (pathname === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });
    res.end("About Page");
  } else if (pathname === "/posts") {
    if (id) {
      const post = JSON.parse(posts).find((post) => post.id === Number(id));
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(post));
      return;
    }

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(posts);
  }
});

server.listen(3000, "localhost", () => {
  console.log("server is running http://localhost:3000");
});
