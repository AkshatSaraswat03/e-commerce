import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'

const Orderpage = ({ match }) => {

  const orderId = match.params.id

  const dispatch = useDispatch()


  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  //sdghj
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  console.log(userInfo)

  //calculating prices
  if (!loading) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])

  return loading ? <Loader /> : error ? <h6 style={{ color: 'red' }}>{error}</h6>
    : <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Shipping</h3>
              <p><strong>Name: </strong>{userInfo.name}</p>
              <p><strong>Email: </strong><a href={`mailto:${userInfo.email}`}>{userInfo.email}</a></p>
              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? <h6 style={{ color: 'green' }}>Delivered on {order.deliveredAt}</h6> :
                <h6 style={{ color: 'red' }}>Not Delivered</h6>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Payment Method</h3>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <h6 style={{ color: 'green' }}>Paid on {order.paidAt}</h6> :
                <h6 style={{ color: 'red' }}>Not Paid</h6>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3>Order Item</h3>
              {order.orderItems.length === 0 ? <h6 style={{ color: 'red' }}>No orders!!</h6> : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
}

export default Orderpage
