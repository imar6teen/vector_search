import dotenv from "dotenv";
dotenv.config();
import https from "https";
import fs from "fs";
import path from "path";

(async () => {
  console.log(fs.readdirSync(path.resolve(process.cwd())));
  const file = fs.createWriteStream(
    path.resolve(process.cwd(), process.env.MONGO_CERT),
  );
  https.get(process.env.BLOB_KEY_MONGO_URL, (res) => {
    res.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download Completed to", file.path);
    });
    console.log(fs.readdirSync(path.resolve(process.cwd())));
  });
})();
