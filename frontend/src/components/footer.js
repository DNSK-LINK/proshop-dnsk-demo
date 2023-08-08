import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
        <div>
          <Container>
            <Row>
              <Col className='text-center py-3'>
                Copyright &copy;  Denys Tseliutin 2023 
              </Col>
            </Row>
          </Container>
        </div>
    </div>
  )
}

export default Footer