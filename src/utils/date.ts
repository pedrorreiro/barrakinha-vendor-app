import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt";

TimeAgo.addLocale(pt);

export function formatDate(date: Date) {
  const timeAgo = new TimeAgo("pt-BR");
  const formattedDate = timeAgo.format(date);
  const capitalizedDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  return capitalizedDate;
}
