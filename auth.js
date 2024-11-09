const jwt = require("jsonwebtoken");
const { admin, jwt_secret } = require("./config.json");

const LOGIN_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

function setCookie(res, user) {
  const token = jwt.sign({ user }, jwt_secret, {
    "expiresIn": LOGIN_DURATION.toString()
  });
  const options = {
    "httpOnly": true,
    "sameSite": true,
    "secure": true,
    "maxAge": LOGIN_DURATION
  };
  res.cookie("token", token, options);
}

async function checkToken(token) {
  let d;
  try {
    d = jwt.verify(token, jwt_secret);
  } catch {
    return null;
  }
  const { user } = d;
  if (user != "admin") return null;
  return user;
}

async function verifyLogin(password, res) {
  if (password != admin) return false;
  setCookie(res, "admin");
  return true;
}

module.exports = { verifyLogin, checkToken };
