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


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Loginpage} />
          <Route exact path="/register" component={Registerpage} />
          <Route path='/product/:id' component={Productpage} />
          <Route path='/cart/:id?' component={Cartpage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
