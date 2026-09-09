import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { faq } from '../utils/data';
import '../style.css'

const FAQ = () => {
    return (
        <Container className='my-5'>
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <Accordion defaultActiveKey="0">
                {faq.map((i) => (
                        <Accordion.Item key={i.eKey} eventKey={i.eKey} className='fs-5'>
                            <Accordion.Header >{i.title}</Accordion.Header>
                            <Accordion.Body className='bg-info bg-opacity-25'>{i.text} </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </Container>
    )
}
export default FAQ