import Validator from '@/domain/@shared/validator/validator'
import * as yup from 'yup'
import Product from '../entity/product'

export default class ProductYupValidator implements Validator<Product> {
  validate (entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup
            .number()
            .required('Price is required')
            .moreThan(0, 'Price must be greater than zero')
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price
        },
        {
          abortEarly: false
        })
    } catch (error) {
      const e = error as yup.ValidationError
      e.errors.forEach(error => {
        entity.notifier.addError({
          context: 'product',
          message: error
        })
      })
    }
  }
}
