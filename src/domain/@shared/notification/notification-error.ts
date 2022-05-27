import Notification from './notification'
export default class NotificationError extends Error {
  constructor (public errors: Notification[]) {
    super(errors.map(m => `${m.context}: ${m.message}`).join(','))
    this.name = 'NotificationError'
  }
}
