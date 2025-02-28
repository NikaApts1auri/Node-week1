import fs from "fs";
import http from "http";

fs.writeFileSync(
  "message.txt",
  "this is new line"
);
console.log(" ტექსტი წარმატებით დაემატა!");

fs.unlinkSync("message.txt");
console.log("ფაილი წარმატებით წაიშალა!");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "content-type": "text/plain",
  });
  if (req.url === "/") {
    res.end("Home Page");
  } else if (req.url === "/about") {
    res.end("About Page");
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    }); // ამას იმიტომ ვიმეორებთ რომ 200 სტატუს დააბრუნებს და იქნება Not found 404 bad practive :))
    res.end("404 Not Found");
  }
  res.end("Welcome to my Node.js server!");
});

server.listen(3000, "localhost", () => {
  console.log("server is running");
});
