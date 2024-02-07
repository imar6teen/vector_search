import dotenv from "dotenv";
dotenv.config();
import https from "https";
import fs from "fs";

(async () => {
  const file = fs.createWriteStream(process.env.MONGO_CERT);
  https.get(process.env.BLOB_KEY_MONGO_URL, (res) => {
    res.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  });
})();
