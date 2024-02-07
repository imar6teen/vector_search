import fs from "fs";
import path from "path";
import https from "https";

async function downloadKey() {
  const file = fs.createWriteStream(
    path.resolve("/tmp", process.env.MONGO_CERT as string),
  );
  https.get(process.env.BLOB_KEY_MONGO_URL as string, (res) => {
    res.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download Completed to", file.path);
    });
  });
}

export default downloadKey;
