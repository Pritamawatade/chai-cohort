import { createContext, useContext , useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({children}) {
    const [notification, setNotification] = useState(null);
    const value = {
        notification,
        setNotification
    }
    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}
export function useNotification() {
    return useContext(NotificationContext);
}