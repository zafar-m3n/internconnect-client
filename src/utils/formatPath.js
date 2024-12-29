export function formatPath(pathname) {
  if (!pathname) return "";

  const parts = pathname.split("/");
  const filteredParts = parts.filter((part) => part.trim() !== "");
  const formattedParts = filteredParts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return formattedParts.join(" ");
}
