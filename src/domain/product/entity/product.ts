import EntityNotifier from '@/domain/@shared/entity/entity-notifier'
import NotificationError from '@/domain/@shared/notification/notification-error'
import ProductValidatorFactory from '../factory/product-validator.factory'

export default class Product extends EntityNotifier {
  private readonly _id: string
  private _name: string
  private _price: number

  constructor (id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }

  validate (): void {
    ProductValidatorFactory.create().validate(this)

    if (this.notifier.hasErrors) {
      throw new NotificationError(this.notifier.errors)
    }
  }

  get id (): string {
    return this._id
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }

  changeName (name: string): void {
    this._name = name
    this.validate()
  }

  changePrice (price: number): void {
    this._price = price
    this.validate()
  }
}
