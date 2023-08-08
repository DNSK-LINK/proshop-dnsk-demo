import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/formContainer'
import { register } from '../actions/userActions'


function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')
 
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
 
    const redirect = location.state ? Number(location.state) : '/'
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
 
    
 
    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password!== passwordConfirm) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <Row>
                <h1>Register</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
    
                    
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}    
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}    
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Confirm Password'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Register</Button>

                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account? <Link 
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                    </Col>
                </Row>
                                    
            </Row>
        </FormContainer>
    ) 
}

export default RegisterScreen