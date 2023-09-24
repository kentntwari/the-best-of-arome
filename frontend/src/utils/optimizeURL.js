import { Cloudinary } from "@cloudinary/url-gen";
import { bitRate } from "@cloudinary/url-gen/actions/transcode";
import { volume } from "@cloudinary/url-gen/actions/videoEdit";

export function optimizeURL({
  publicID,
  provider = "cloudinary",
  assetType = "audio",
  transformations = null,
}) {
  /* FOR CLOUDINARY PROVIDER */

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  // cloudinary considers audio transformations as video ones
  if (!transformations)
    return cld
      .video(publicID)
      .transcode(bitRate("32k"))
      .videoEdit(volume(70))
      .format("auto")
      .toURL();

  if (transformations && typeof transformations === "string")
    return cld.video(publicID).addTransformation(transformations).toURL();

  throw new Error("transformations has to be of type string");
}
