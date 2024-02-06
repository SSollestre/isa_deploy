const http = require("http");
const url = require("url");
const lang = require("./lang/en/strings");
const utils = require("./modules/utils");

const server = http.createServer((req, res) => {
  const name = url.parse(req.url, true).query.name || "User";
  const userString = lang.userString.replace("%1", name);
  const date = utils.getDate();

  const content = `
    <html>
      <body>
        <span style="color: blue;">${userString} ${date}</span>
      </body>
    </html>
    `;

  res.end(content);
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
