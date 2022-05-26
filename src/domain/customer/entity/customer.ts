import EntityNotifier from '@/domain/@shared/entity/entity-notifier'
import NotificationError from '@/domain/@shared/notification/notification-error'
import Address from '../value-objects/address'

export default class Customer extends EntityNotifier {
  private readonly _id: string
  private _name: string
  private _address: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()

    if (this.notifier.hasErrors) {
      // throw new NotificationError(this.notifier.errors)
    }
  }

  validate (): void {
    if (this._id.length === 0) {
      this.notifier.addError({ message: 'Id is required', context: 'customer' })
    }
    if (this._name.length === 0) {
      this.notifier.addError({ message: 'Name is required', context: 'customer' })
    }
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get address (): Address {
    return this._address
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  changeName (name: string): void {
    this._name = name
  }

  changeAddress (address: Address): void {
    this._address = address
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }

  isActive (): boolean {
    return this._active
  }

  activate (): void {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate (): void {
    this._active = false
  }
}
