import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./connectDB.js";
import router from "./routes/enquiryRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
configDotenv();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/enquiries/", router);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "DroneTV API is running..." });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
