import NotificationError from './notification-error'

describe('Unit test for Notification', () => {
  test('should don\'t create a error', () => {
    const notification = new NotificationError()
    expect(notification.hasErrors).toBe(false)
  })

  test('should create a error', () => {
    const notification = new NotificationError()

    const error = {
      message: 'error message',
      context: 'customer'
    }
    const formatedMessage = `${error.context}: ${error.message}`

    notification.addError(error)

    const messages = notification.messages('customer')

    expect(notification.hasErrors).toBe(true)
    expect(messages.split(',').length).toBe(1)
    expect(messages).toBe(formatedMessage)
  })

  test('should create many errors', () => {
    const notification = new NotificationError()

    const error = {
      message: 'error message',
      context: 'customer'
    }
    const formatedMessage = `${error.context}: ${error.message}`

    notification.addError(error)
    notification.addError(error)

    expect(notification.messages('customer')).toBe(`${formatedMessage},${formatedMessage}`)
  })

  test('should returns only messages of customer context', () => {
    const notification = new NotificationError()

    const error1 = {
      message: 'error message',
      context: 'customer'
    }
    const formatedMessage1 = `${error1.context}: ${error1.message}`

    notification.addError(error1)

    const error2 = {
      message: 'error message',
      context: 'order'
    }

    notification.addError(error2)

    expect(notification.messages('customer')).toBe(`${formatedMessage1}`)
  })

  test('should returns all messages', () => {
    const notification = new NotificationError()

    const error1 = {
      message: 'error message',
      context: 'customer'
    }
    const formatedMessage1 = `${error1.context}: ${error1.message}`

    notification.addError(error1)

    const error2 = {
      message: 'error message',
      context: 'order'
    }
    const formatedMessage2 = `${error2.context}: ${error2.message}`

    notification.addError(error2)

    expect(notification.messages()).toBe(`${formatedMessage1},${formatedMessage2}`)
  })
})
