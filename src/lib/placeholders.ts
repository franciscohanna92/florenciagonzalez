export type PlaceholderImageUrl = `https://placehold.co/${string}`;

type PlaceholderImageOptions = {
  background?: string;
  foreground?: string;
  format?: "png" | "jpg" | "webp";
};

export function placeholderImage(
  size: string,
  text: string,
  {
    background = "efe4d8",
    foreground = "2d2926",
    format = "png",
  }: PlaceholderImageOptions = {},
): PlaceholderImageUrl {
  const label = encodeURIComponent(text).replaceAll("%20", "+");

  return `https://placehold.co/${size}/${background}/${foreground}/${format}?text=${label}`;
}
