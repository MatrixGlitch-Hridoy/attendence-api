const express = require("express");
const connectDB = require("./db/db");
const authenticate = require("./middlewares/authenticate");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use(routes);

app.get("/private", authenticate, (req, res) => {
  return res.status(200).json({ message: "I am private route" });
});
app.get("/public", (req, res) => {
  return res.status(200).json({ message: "I am public route" });
});

connectDB("mongodb://127.0.0.1:27017/attendence-db")
  .then(() => {
    app.listen(5000, () => {
      console.log("server is listening port 5000");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use((err, req, res, next) => {
  console.log(err);
  const message = err.message ? err.message : "Server Error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});
