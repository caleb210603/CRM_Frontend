export interface Notification {
    id: number;
    title: string;
    notification: string;
    date: string;
    user: {
        name: string,
        last_name: string
    }
}