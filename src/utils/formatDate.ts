export const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  return {
    year: parsedDate.getFullYear(),
    month: parsedDate.getMonth() + 1, // 月は0から始まるので1を足す
    day: parsedDate.getDate(),
    time: parsedDate.toTimeString().split(" ")[0], // 時間を取り出す
  };
};
export const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toISOString();
};
export const getCurrentMonth = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 月は0始まりなので1を足す
  return `${year}-${month}`;
};
