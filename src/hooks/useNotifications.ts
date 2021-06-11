import { useState, useEffect } from "react"
import axios from "axios"
import { INotification } from "constants/interfaces"

export default function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([])

  useEffect(() => {
    axios.get("http://localhost:4040/api/notifications").then(({ data }) => {
      if (data.length) {
        setNotifications(data)
      }
    })
  }, [])

  return notifications
}
