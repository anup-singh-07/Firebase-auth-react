import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router';

import { useAuth } from '../contexts/AuthContext.js';

export default function Dashboard() {
    const {currentUser, logOut} = useAuth(); 
    const history = useHistory();

    const logoutHandler = async() => {
        await logOut();
        history.push('/login')
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h3>Hello <span>{currentUser.email}</span></h3>
                </Card.Body>
                <Button className='btn btn-primary w-100 mt-20' onClick={logoutHandler}>Log Out</Button>
            </Card>
        </>
    )
}
