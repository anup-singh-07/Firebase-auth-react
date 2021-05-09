import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';


export default function ForgotPassword() {
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false);
    const { forgotPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await forgotPassword(emailRef.current.value);
            setMessage('Check you email for resetting the password.')
        } catch {
            setError('Are you sure you are enetring correct email?');
            setLoading(false);
        }
    }

    return (
        <>
            <h3 style={{ padding: '20px 50px', color: 'grey', textAlign: 'center' }}>No worries😎</h3>
            <Card>
                <Card.Body>
                    <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type="submit">Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        Oh! I came here by mistake😄.<br></br><Link to='/login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                New User? No Worries <Link to='/signup'>Signup</Link>.
            </div>
        </>
    )
}
