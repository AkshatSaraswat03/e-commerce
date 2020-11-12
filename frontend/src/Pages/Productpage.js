import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const Productpage = (props) => {
  const product = products.find(p => p._id === props.match.params.id)

  return (
    <>
      <Link className='btn btn-danger my-3' to='/'>
        Go Back
      </Link>
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
      </Row>
    </>
  )
}

export default Productpage
