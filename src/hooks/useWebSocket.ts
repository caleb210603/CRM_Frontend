import { useEffect, useState } from "react";
import { Notification, NotificationId, ResponseCreateNotification } from "@/types/notification";
import { id } from "date-fns/locale";

interface UseWebSocketProps {
    onNotificationReceived: (notification: Notification) => void;
    onNotificationsListReceived: (notifications: Notification[], hasNext: boolean) => void;
    hasNext: boolean;
}

const useWebSocket = ({ onNotificationReceived, hasNext, onNotificationsListReceived }: UseWebSocketProps) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const socketUrl = 'ws://127.0.0.1:8000/ws/notifications/';
        const websocket = new WebSocket(socketUrl);

        websocket.onopen = () => {
            console.log('Connected to WebSocket');
        };

        websocket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.type === 'single-list') {
                const notification = { ...response.data, date: new Date(response.data.date) };
                onNotificationReceived(notification);
            } else if (response.type === 'list-all') {
                const notifications = response.notifications.map((notification: Notification) => ({
                    ...notification,
                    date: new Date(notification.date),
                }));
                onNotificationsListReceived(notifications, response.has_next);
            }
            setLoading(false);
        };

        websocket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(websocket);

        return () => {
            websocket.close();
        };
    }, []);

    const createNotification = (notification: ResponseCreateNotification) => {
        if (socket) {
            socket.send(JSON.stringify({ action: 'create', ...notification }));
        }
    };

    const deleteNotification = (id: NotificationId) => {
        if (socket) {
            setLoading(true);
            socket.send(JSON.stringify({ action: 'delete', id }));
        }
    };

    const updateNotification = (notification: Notification) => {
        if(socket) {
            setLoading(true);
            socket.send(JSON.stringify({action:'update', ...notification}))
        }
    }

    const archiveNotification = (userId: number, notificationId: number) => {
        if (socket) {
            socket.send(JSON.stringify({ action: 'archive', notification_id: notificationId, user_id: userId }));
        }
    };

    const unarchiveNotification = (userId: number, notificationId: number) => {
        if (socket) {
            socket.send(JSON.stringify({ action: 'unarchive', notification_id: notificationId, user_id: userId }));
        }
    };

    const getListNotifications = (page: number) => {
        if (socket) {
            if(!hasNext) return
            setLoading(true);
            socket.send(JSON.stringify({ action: 'list', page }));
        }
    };

    return {
        createNotification,
        deleteNotification,
        archiveNotification,
        getListNotifications,
        unarchiveNotification,
        updateNotification,
        loading,
    };
};

export default useWebSocket;
