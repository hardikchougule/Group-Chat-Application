export function timeAgoInMinutes(timestamp) {
  if (!timestamp) return "just now";

  const clean = timestamp.split(".")[0];
  const past = new Date(clean);

  if (isNaN(past.getTime())) return "just now";

  const now = new Date();
  const diffMs = now - past;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
