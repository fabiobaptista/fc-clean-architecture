import Notification from './notification'
export default class NotificationError extends Error {
  constructor (messages: Notification[]) {
    super(messages.map(m => `${m.context}: ${m.message}`).join(','))
    this.name = 'NotificationError'
  }
}
