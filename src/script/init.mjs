import dotenv from "dotenv";
dotenv.config();
import { head } from "@vercel/blob";
import https from "https";
import fs from "fs";
import path from "path";

(async () => {
  const getMetadata = await head(process.env.BLOB_KEY_MONGO_URL, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const file = fs.createWriteStream(
    path.join(__dirname, process.env.MONGO_CERT),
  );

  https.get(getMetadata.downloadUrl, function (response) {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log(
        "downloaded to ",
        path.join(__dirname, process.env.MONGO_CERT),
      );
    });
  });
})();
