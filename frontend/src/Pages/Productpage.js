import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')


  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { error: errorProductReview, success: successProductReview } = productReviewCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])


  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }


  return (
    <>
      <Link className='btn btn-danger my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <h4>{error}</h4> : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item style={{ backgroundColor: "#060606" }}>
                  <h4>{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "#060606" }} >
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color="lightcyan" />
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "#060606" }} >
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item style={{ backgroundColor: "#060606" }} >
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                  </Col>
                      <Col>
                        ${product.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Status:
                  </Col>
                      <Col>
                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) =>
                            setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(a => (
                              <option key={a + 1} value={a + 1}>{a + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button className="btn-block" onClick={addToCart} type="button" disabled={product.countInStock === 0}>
                      Add to Cart
                </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              {product.reviews.length === 0 && <h6 style={{ color: 'red' }}>No Reviews</h6>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a Customer Review</h4>
                  {errorProductReview && <h6 style={{ color: 'red' }}>{errorProductReview}</h6>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler} >
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>) :
                    <h6 style={{ color: 'red' }}>Please <Link to='/login'>Login</Link> to review</h6>}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}

    </>
  )
}

export default Productpage
