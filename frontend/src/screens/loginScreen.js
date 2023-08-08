import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/formContainer'
import { login } from '../actions/userActions'

function LoginScreen() {
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const redirect = location.state ? Number(location.state) : '/'
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
 
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])
    

    

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}    
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link 
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen