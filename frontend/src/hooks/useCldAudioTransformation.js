import { Cloudinary } from "@cloudinary/url-gen";
import { bitRate } from "@cloudinary/url-gen/actions/transcode";
import { volume } from "@cloudinary/url-gen/actions/videoEdit";

const useCldAudioTransformation = (public_id, transformations = null) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  // cloudinary considers audio transformations as video ones
  if (!transformations)
    return (
      cld
        .video(public_id)
        .transcode(bitRate("32k"))
        .videoEdit(volume(70))
        .format("auto")
        .toURL()
    );

  if (transformations && typeof transformations === "string")
    return cld.video(public_id).addTransformation(transformations).toURL();

  throw new Error("transformations has to be of type string");
};

export { useCldAudioTransformation };
