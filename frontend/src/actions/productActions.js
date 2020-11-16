import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    //making request
    const { data } = await axios.get('/api/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })

  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: err.message
    })
  }
}