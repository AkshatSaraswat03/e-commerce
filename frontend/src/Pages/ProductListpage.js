import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListpage = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


  useEffect(() => {

    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }

  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])



  const deleteHandler = (id) => {
    if (window.confirm('Are you sure ?')) {
      //delete products
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    //create product
    dispatch(createProduct())
  }

  return (
    <>
      <Row className='align-tems-center'>
        <Col>
          <h2>Products</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i>Create Product
        </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <h6 style={{ color: 'red' }}>{errorDelete}</h6>}

      {loadingCreate && <Loader />}
      {errorCreate && <h6 style={{ color: 'red' }}>{errorCreate}</h6>}

      {loading ? <Loader /> : error ? <h6 style={{ color: 'red' }}>{error}</h6> :
        (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button cariant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() =>
                      deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </>
  )
}

export default ProductListpage
