export interface Notification {
    id: number;
    title: string;
    notification: string;
    date: Date;
    user: {
        name: string,
        last_name: string
    },
    list_archives: number[]
}