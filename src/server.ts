import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
const port = process.env.port;

app.listen(port, () => {
  console.log(`listening on port - ${port}`);
});
