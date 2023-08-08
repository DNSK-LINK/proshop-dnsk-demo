import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


import FormContainer from '../components/formContainer'
import CheckoutSteps from '../components/checkoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [zip, setZip] = useState(shippingAddress.zip)
    const [country, setCountry] = useState(shippingAddress.country)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submited')
        dispatch(saveShippingAddress({ address, city, zip, country }))
        navigate('/payment')

    } 


  return (


    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={ submitHandler }>

            <FormGroup controlId='adress'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}    
                >
                </Form.Control>
            </FormGroup>

            <FormGroup controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter city'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}    
                >
                </Form.Control>
            </FormGroup>

            <FormGroup controlId='zip'>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter zip'
                    value={zip ? zip : ''}
                    onChange={(e) => setZip(e.target.value)}    
                >
                </Form.Control>
            </FormGroup>

            <FormGroup controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}    
                >
                </Form.Control>
            </FormGroup>
        
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>


  )
}

export default ShippingScreen