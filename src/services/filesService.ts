

/*import { getUrl } from "aws-amplify/storage";

export const fetchImageUrl = async (imgPath: string) => {
    if (!imgPath) return;
    try {
      const res = await getUrl({
        path: "images/" + imgPath,
      });
      return res.url.href;
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };
  */


export const fetchImageUrl = (imgPath: string): string => {
    if (!imgPath) return "";
    return process.env.NEXT_PUBLIC_S3_URL + '/images/' + imgPath
};