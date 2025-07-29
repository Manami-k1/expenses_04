// utils/date.ts

// 指定した日付文字列を日本時間でフォーマットして返す
export const formatDate = (date: string) => {
  const utc = new Date(date);
  const offset = utc.getTimezoneOffset() * 60000;
  const local = new Date(utc.getTime() - offset);

  return {
    year: local.getFullYear(),
    month: local.getMonth() + 1,
    day: local.getDate(),
    time: local.toTimeString().split(" ")[0], // "hh:mm:ss"
  };
};

// 現在のUTC時刻（ISO形式）を取得（例: "2025-06-18T10:00:00.000Z"）
export const getCurrentDate = (): string => {
  return new Date().toISOString();
};

// 現在の日本時間の日付（YYYY-MM-DD）を取得
export const getCurrentDateLocal = (): string => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - offset);
  return local.toISOString().slice(0, 10); // 例: "2025-06-18"
};

// 現在の日本時間の年月（YYYY-MM）を取得
export const getCurrentMonth = (): string => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const local = new Date(now.getTime() - offset);
  const year = local.getFullYear();
  const month = String(local.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`; // 例: "2025-06"
};
