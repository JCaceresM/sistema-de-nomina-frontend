import { notification } from 'antd'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

type NotificationParametersType = {
  title: string
  description: string
  type: NotificationType
  onClick?: () => void
}

export const showNotification = (
  parameters: NotificationParametersType
): void => {
  notification[parameters.type]({
    message: parameters.title,
    description: parameters.description,
    onClick: parameters.onClick,
  })
}