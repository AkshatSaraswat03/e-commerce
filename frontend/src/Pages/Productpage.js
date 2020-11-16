import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const Productpage = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails


  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])


  return (
    <>
      <Link className='btn btn-danger my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <h4>error</h4> : (
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

                <ListGroup.Item>
                  <Button className="btn-block" tpe="button" disabled={product.countInStock === 0}>
                    Add to Cart
                </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>)}

    </>
  )
}

export default Productpage
