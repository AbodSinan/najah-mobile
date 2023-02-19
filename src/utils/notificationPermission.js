import * as Notifications from "expo-notifications";

const createNotificationChannel = async () => {
  // Check if the device is running Android
  if (Constants.platform.ios) {
    return;
  }

  const channel = new Notifications.NotificationChannel({
    id: "najah-notification-channel",
    name: "App channel",
    description: "Your channel description",
    sound: true,
    priority: "high",
  });

  await Notifications.createNotificationChannelAsync(channel);
};

// Call the createNotificationChannel function
createNotificationChannel();
