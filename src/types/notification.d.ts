export interface Notification {
    id: number;
    title: string;
    description: string;
    date: Date;
    user_id: number,
    list_archives: number[]
}

export type NotificationToCreate = Omit<Notification, 'id' | 'list_archives'> & {action: string};