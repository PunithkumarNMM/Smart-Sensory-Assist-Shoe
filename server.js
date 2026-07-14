require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log("==================================");
  console.log(" Smart Sensory Assist Shoe Server ");
  console.log("==================================");
  console.log(` Server Running : http://localhost:${PORT}`);
});