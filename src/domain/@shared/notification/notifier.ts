import Notification from './notification'

export default class Notifier {
  private readonly _errors: Notification[] = []

  get hasErrors (): boolean {
    return !!this._errors.length
  }

  get errors (): Notification[] {
    return [...this._errors]
  }

  addError (error: Notification): void {
    this._errors.push(error)
  }

  messages (context?: string): string {
    return this._errors
      .filter(error => !context || error.context === context)
      .map(error => `${error.context}: ${error.message}`)
      .join(',')
  }
}
