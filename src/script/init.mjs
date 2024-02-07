import dotenv from "dotenv";
dotenv.config();
import { head } from "@vercel/blob";
import https from "https";
import fs from "fs";
import path from "path";

(async () => {
  const dir = path.join(process.cwd(), "keys");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const getMetadata = await head(process.env.BLOB_KEY_MONGO_URL, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const file = fs.createWriteStream(
    path.join(process.cwd(), "keys", process.env.MONGO_CERT),
  );

  https.get(getMetadata.downloadUrl, function (response) {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("downloaded");
    });
  });
})();
