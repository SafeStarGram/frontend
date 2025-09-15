import { useEffect, useState } from "react";

export const changeTimeForm = (time?: string) => {
  const date = time ? new Date(time) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${year}.${month}.${day}, ${hours}:${minutes} ${ampm}`;
};

export function useCurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = changeTimeForm();
      setTime(currentTime);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000 * 60); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  return time;
}
