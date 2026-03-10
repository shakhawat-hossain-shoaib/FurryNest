export const resolveImageUrl = (imageUrl, fallbackImage) => {
  if (!imageUrl) {
    return fallbackImage;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://") || imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/uploads/")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("uploads/")) {
    return `/${imageUrl}`;
  }

  return fallbackImage;
};