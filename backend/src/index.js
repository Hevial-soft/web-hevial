require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDB } = require("./db");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/files", require("./routes/files"));
app.use("/api/specialist", require("./routes/specialist"));

const PORT = process.env.API_PORT || 3001;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌐 API сервер: http://localhost:${PORT}`);
  });
});