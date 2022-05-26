export default class NotificationError extends Error {
  constructor (messages: Notification[]) {
    super(messages.join(','))
    this.name = 'NotificationError'
  }
}
