const http = require("http");
const queryString = require("node:querystring");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const filePath = path.join(process.cwd(), "data.json");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Home Route");
    res.end();
    return;
  }
  if (req.url === "/login") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<form action='/submit' method="POST">
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="text" name="password" placeholder="Enter Password" />
        <button>SUBMIT</button>
        </form>`);
    res.end();
    return;
  }
  if (req.url === "/submit") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const parsedData = queryString.parse(data);
      console.log("parsed Data = : ", parsedData);

      const newData = {
        users: [parsedData],
      };

      const dataToSave = JSON.stringify(newData);

      fs.writeFile(filePath, dataToSave, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });

      // fs.readFile(filePath, (err, data) => {
      //   if (err) {
      //     console.log("Error reding file", err);
      //   } else {
      //     const jsonData = JSON.parse(data.toString("utf8"));
      //     console.log("Dataaa", jsonData);
      //     // console.log("json data ki certain field: ", jsonData.users[0]);
      //   }
      // });
      res.write("Success");
      res.end();
    });
    return;
  }

  res.write("Invalid Route");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
