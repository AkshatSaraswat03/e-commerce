import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './Pages/Homepage'
import Productpage from './Pages/Productpage'
import Cartpage from './Pages/Cartpage'
import Loginpage from './Pages/Loginpage'
import Registerpage from './Pages/Registerpage'
import Profilepage from './Pages/Profilepage'
import Shippingpage from './Pages/Shippingpage'
import Paymentpage from './Pages/Paymentpage'
import Placeorderpage from './Pages/Placeorderpage'
import Orderpage from './Pages/Orderpage'
import UserListpage from './Pages/UserListpage'
import UserEditpage from './Pages/UserEditpage'
import ProductListpage from './Pages/ProductListpage'
import ProductEditpage from './Pages/ProductEditpage'


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/login" component={Loginpage} />
          <Route exact path="/register" component={Registerpage} />
          <Route exact path="/profile" component={Profilepage} />
          <Route exact path="/shipping" component={Shippingpage} />
          <Route exact path="/payment" component={Paymentpage} />
          <Route exact path="/placeorder" component={Placeorderpage} />
          <Route exact path="/order/:id" component={Orderpage} />
          <Route path='/product/:id' component={Productpage} />
          <Route path='/cart/:id?' component={Cartpage} />
          <Route path='/admin/userlist' component={UserListpage} />
          <Route path='/admin/user/:id/edit' component={UserEditpage} />
          <Route path='/admin/productlist' component={ProductListpage} />
          <Route path='/admin/product/:id/edit' component={ProductEditpage} />
          <Route exact path="/" component={Homepage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
