import Notifier from '../notification/notifier'

export default abstract class EntityNotifier {
  readonly notifier: Notifier

  constructor () {
    this.notifier = new Notifier()
  }
}
