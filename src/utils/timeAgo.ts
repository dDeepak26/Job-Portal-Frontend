export function timeAgo(dateString: string): string {
  const now = new Date();
  const target = new Date(dateString);
  const diffMs = target.getTime() - now.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(Math.abs(diffSec) / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  const isFuture = diffMs > 0;

  if (Math.abs(diffDay) >= 1) {
    const days = Math.abs(diffDay);
    return isFuture
      ? `in ${days} day${days !== 1 ? "s" : ""}`
      : `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (Math.abs(diffHr) >= 1) {
    const hours = Math.abs(diffHr);
    return isFuture
      ? `in ${hours} hour${hours !== 1 ? "s" : ""}`
      : `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffMin >= 1) {
    const minutes = Math.abs(diffMin);
    return isFuture
      ? `in ${minutes} minute${minutes !== 1 ? "s" : ""}`
      : `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return isFuture ? "in a few seconds" : "just now";
  }
}
