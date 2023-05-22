import React, { useEffect, useState } from "react";

export function useLocalStorage<T, Key extends "TAGS" | "NOTES">(
  key: Key,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    const jasonData = localStorage.getItem(key);
    if (!jasonData) {
      return initialValue;
    } else return JSON.parse(jasonData);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue]);

  return [value, setValue]as [T,typeof setValue];
}


