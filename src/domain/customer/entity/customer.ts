import Address from '../value-objects/address'

export default class Customer {
  private readonly _id: string
  private _name: string
  private _address: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  validate (): void {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
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
