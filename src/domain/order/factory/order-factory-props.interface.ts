export default interface OrderFactoryProps {
  id: string
  customerId: string
  items: Array<{
    id: string
    name: string
    productId: string
    quantity: number
    price: number
  }>
}
