import Validator from '@/domain/@shared/validator/validator'
import Customer from '../entity/customer'
import yup from 'yup'

export default class CustomerYupValidator implements Validator<Customer> {
  validate (entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required')
        })
        .validateSync({
          id: entity.id,
          name: entity.name
        },
        {
          abortEarly: false
        })
    } catch (error) {
      const e = error as yup.ValidationError
      e.errors.forEach(error => {
        entity.notifier.addError({
          context: 'customer',
          message: error
        })
      })
    }
  }
}
