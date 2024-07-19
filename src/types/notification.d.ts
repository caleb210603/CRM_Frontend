export type NotificationId = number;

export interface Notification {
    id: NotificationId;
    title: string;
    description: string;
    date: Date;
    user_id: number,
    list_archives: number[]
}

export type ResponseCreateNotification = Omit<Notification, 'id'>;