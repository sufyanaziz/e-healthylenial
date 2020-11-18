export const formatDate = val => {
  const date = new Date(val);

  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  const arr = [dd, mm, yyyy];
  return arr.reverse().join("-");
};
export const getDateKegiatan = (val, filter) => {
  const date = new Date(val);

  const dd = date.getDate();
  const mm = month[date.getMonth()];
  const yyyy = date.getFullYear();

  const splitTime = date.toLocaleTimeString().split(":");
  const day = date.toLocaleTimeString().split(" ")[1];
  const time = `${splitTime[0]}:${splitTime[1]} ${day}`;
  let fixDate;

  if (filter) {
    fixDate = `${time}`;
  } else {
    fixDate = `${dd} ${mm} ${yyyy}, ${time}`;
  }

  return fixDate;
};

export const getTodayDate = () => {
  const dd = new Date().getDate();
  const mm = new Date().getMonth() + 1;
  const yyyy = new Date().getFullYear();

  const arr = [dd, mm, yyyy];
  return arr.reverse().join("-");
};

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
