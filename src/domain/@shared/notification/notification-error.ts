import Notification from './notification'

export default class NotificationError {
  private readonly errors: Notification[] = []

  addError (error: Notification): void {
    this.errors.push(error)
  }

  messages (context?: string): string {
    return this.errors
      .filter(error => !context || error.context === context)
      .map(error => `${error.context}: ${error.message}`)
      .join(',')
  }
}
