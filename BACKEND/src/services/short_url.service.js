import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/short_url.model.js";
// DHYAN DEIN: getCustomShortUrl ko dao se import karna zaroori hai
import { saveShortUrl, getCustomShortUrl } from "../dao/short_url.js";

export const createShortUrlWithoutUser = async (url) => {
  const shortUrl = generateNanoId(7);
  if (!shortUrl) throw new Error("Short URL not generated");
  await saveShortUrl(shortUrl, url);
  return shortUrl;
};

// Yahan (url, userId, slug) teeno aayenge
export const createShortUrlWithUser = async (url, userId, slug) => {
  let shortUrl;

  // Agar user ne custom name (slug) diya hai
  if (slug) {
    const exists = await getCustomShortUrl(slug);
    if (exists) throw new Error("This custom url already exists");
    shortUrl = slug; // Custom name ko hi shortUrl bana do
  } else {
    // Agar custom name nahi diya, toh random generate karo
    shortUrl = generateNanoId(7);
  }

  await saveShortUrl(shortUrl, url, userId);
  return shortUrl;
};
