const nulls = require("nulls");

const { checkToken } = require("./auth.js");

nulls({
  "init": (app, server) => {
    process.on("SIGINT", () => server.close());
  },
  "hook": async (req, res) => {
    const token = req.cookies.token;
    if (token == null) req.auth = null;
    else req.auth = await checkToken(token);
  },
  "nulls": "./html",
  "static": "./static",
  "ready": () => console.log("Server up!"),
  "port": parseInt(process.argv[2] ?? 31337),
  "https": true
});
