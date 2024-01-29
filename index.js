const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
require("express-async-errors");
const connecDB = require("./db/connectDB");
const authRouter = require("./routes/auth-route");
const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");
const app = express();

const { default: mongoose } = require("mongoose");
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/auth", authRouter);

app.get("/", authentication, (req, res) => {
  res.send("dashboeard");
});

app.use(errorHandler);
const port = process.env.PORT;
const start = async () => {
  try {
    await connecDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening to the port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.on("error", (err) => {
    logError(err);
  });
};

start();
