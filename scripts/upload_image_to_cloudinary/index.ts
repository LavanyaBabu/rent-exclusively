import { prisma } from "db";
import { Prisma, ApartmentImage } from "@prisma/client";
import { getCloudinaryInstance } from "../../external/cloudinary/index";
import cuid from "cuid";
import mime from "mime-types";
import https from "https";

// ****** WIP ********

const cloudinary = getCloudinaryInstance();

export async function main() {
  const result = await prisma.$queryRaw<ApartmentImage[]>(
    Prisma.sql`SELECT * FROM "public"."ApartmentImage" WHERE image IS NULL AND url IS NOT NULL`
  );
  for (const res of result) {
    console.log("Uploading ID ", res.id);
    const url = res.url;
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    const mimeType = mime.lookup(fileName);
    if (!mimeType) {
      continue;
    }
    if (!mimeType.startsWith("image")) {
      continue;
    }
    let stream: any;
    https.get(url, async (imageRes) => {
      imageRes.pipe(stream);
      const { id, filename, _meta } = await cloudinary.save({
        stream,
        filename: fileName,
        id: cuid()
      });

      console.log("saved id ", res.id, "to cloudinary");

      await prisma.apartmentImage.update({
        where: { id: res.id },
        data: {
          image: {
            id,
            filename,
            _meta,
            originalFilename: filename,
            mimetype: mimeType
          }
        }
      });

      console.log("saved id ", res.id, "to DB");
    });
  }
  console.log(result);

  // return { id, filename, originalFilename, mimetype, encoding, _meta };
}

// (async () => {
//   await main();
// })();
