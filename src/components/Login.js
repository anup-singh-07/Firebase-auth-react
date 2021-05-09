import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';


export default function Login() {
    const emailRef = useRef();
    const pwdRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { logIn } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, pwdRef.current.value);
            history.push('/')
        } catch {
            setError('Failed to login. Try again!!');
            setLoading(false);
        }
    }

    return (
        <>
        <h3 style={{padding: '20px 50px', color: 'grey'}}>Welcome to the Family.</h3>
            <Card>
                <Card.Body>
                    <h2 style={{ textAlign: 'center' }}>Log In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={pwdRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type="submit">Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/resetPwd'>Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                New User? No Worries <Link to='/signup'>Signup</Link>.
            </div>
        </>
    )
}
