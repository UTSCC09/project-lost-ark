import { NotificationsContextProps } from "@mantine/notifications/lib/types";

type ErrorOptions = {
  notifications?: NotificationsContextProps;
  errorMsg?: String;
};

export const handleError = (error: any, options: ErrorOptions = {}) => {
  console.error(error);
  const { notifications, errorMsg } = options;
  if (notifications) {
    notifications.showNotification({
      color: "red",
      message: errorMsg ?? error?.response?.data ?? error.toString(),
    });
  }
};
