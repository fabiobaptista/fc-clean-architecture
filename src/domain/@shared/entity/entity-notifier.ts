import Notifier from '../notification/notifier'

export default abstract class EntityNotifier {
  protected readonly notifier: Notifier

  constructor () {
    this.notifier = new Notifier()
  }
}
