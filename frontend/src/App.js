import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './Pages/Homepage'


const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Homepage />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
