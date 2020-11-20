import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const Paymentpage = ({ history }) => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')

  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type='radio'
              label='Visa MasterCard'
              id='visa'
              name='paymentMethod'
              value='Visa'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='info'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default Paymentpage
