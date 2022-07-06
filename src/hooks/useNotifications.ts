import { useState, useEffect } from "react"
import axios from "axios"
import { INotification } from "constants/interfaces"

export default function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[]>([])

  useEffect(() => {
    axios.get(`/notifications`).then(({ data }) => {
      if (data.length) {
        setNotifications(data)
      }
    })
  }, [])

  return notifications
}
