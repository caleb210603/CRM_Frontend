import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDaysPassed(date: Date) {
  const now = new Date();
  const diffInTime = now.getTime() - date.getTime();  

  // Calcular el tiempo en diferentes unidades
  const seconds = Math.floor(diffInTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  // Definir el formato de salida basado en la cantidad de tiempo pasado
  if (years > 0) {
      return years === 1 ? "hace 1 año" : `hace ${years} años`;
  } else if (months > 0) {
      return months === 1 ? "hace 1 mes" : `hace ${months} meses`;
  } else if (weeks > 0) {
      return weeks === 1 ? "hace 1 semana" : `hace ${weeks} semanas`;
  } else if (days > 0) {
      return days === 1 ? "hace 1 día" : `hace ${days} días`;
  } else if (hours > 0) {
      return hours === 1 ? "hace 1 hora" : `hace ${hours} horas`;
  } else if (minutes > 0) {
      return minutes === 1 ? "hace 1 minuto" : `hace ${minutes} minutos`;
  } else {
      return seconds <= 10 ? "hace unos segundos" : `hace ${seconds} segundos`;
  }
}

export function formatDate(dateString: string): string {
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const date = new Date(dateString);
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();

  return `${monthName} ${year}`;
}

export function getInitials(name: string, lastname: string) {
  const nameParts = name.split(" ");
  let initials = "";
  
  if (nameParts.length === 1) {
    initials += nameParts[0][0].toUpperCase();
    initials += lastname[0].toUpperCase();
  } else {
    for (let i = 0; i < nameParts.length; i++) {
      if (nameParts[i].length > 0 && nameParts[i] !== "") {
        initials += nameParts[i][0].toUpperCase();
      }
    }
  }
  
  return initials.slice(0, 2);
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export function handleNumericInput(e: { currentTarget: { value: string } }) {
  e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, "");
}

export const categoryColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-teal-500",
  "bg-violet-500",
];

// funciones para contralar el almacenamiento local
export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// funciones para contralar el almacenamiento de sesion
export const setSessionStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
};

export const getSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(key);
  }
};

export const removeSessionStorage = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

// funciones para contralar el almacenamiento de cookies
export const setCookie = (key: string, value: string, days: number) => {
  if (typeof window !== "undefined") {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${key}=${value};${expires};path=/`;
  }
};

export const getCookie = (key: string) => {
  if (typeof window !== "undefined") {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    document.cookie = `${key}=; Max-Age=-99999999;`;
  }
};
