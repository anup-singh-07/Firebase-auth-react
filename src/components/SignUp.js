import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';


export default function SignUp() {
    const emailRef = useRef();
    const pwdRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const confirmPwd = useRef();
    const { signUp } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (pwdRef.current.value !== confirmPwd.current.value) {
            return setError('Password do not match!!');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, pwdRef.current.value);
            history.push('/')
        } catch {
            setError('Failed to create an account!!');
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
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
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='text' ref={confirmPwd} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Try Log In</Link>
            </div>
        </>
    )
}
