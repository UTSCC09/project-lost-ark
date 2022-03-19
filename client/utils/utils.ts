import { NotificationsContextProps } from "@mantine/notifications/lib/types";

type ErrorOptions = {
  notifications?: NotificationsContextProps;
  errorMsg?: String;
};

export const isLoggedIn = () => {
  // Credits: cookie parser from https://gist.github.com/rendro/525bbbf85e84fa9042c2
  if (typeof window === "undefined") {
    return false;
  }
  const cookie = Object.fromEntries(
    document.cookie.split("; ").map((x) => x.split("="))
  );
  console.log(!!cookie.username);
  return !!cookie.username;
};

export const handleError = (error: any, options: ErrorOptions = {}) => {
  console.error(error);
  const { notifications, errorMsg } = options;
  if (notifications) {
    notifications.showNotification({
      color: "red",
      message: errorMsg ?? error?.response?.data,
    });
  }
};
