import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submit');
    }

    return (
        // <div>LoginScreen</div>
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>

                {/* Email */}
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                {/* Password */}
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                {/* Button */}
                <Button type='submit' variant='priamry' className='mt-3'>
                    Sign In
                </Button>

                <Row className='py-3'>
                    <Col>
                        New Costumer? <Link to='/register'>Register!</Link>
                    </Col>
                </Row>

            </Form>

        </FormContainer>
    )
}

export default LoginScreen