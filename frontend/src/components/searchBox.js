import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function SearchBox() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword.trim()}&page=1`);
        } else {
            navigate(`/`);
        }
    };

    const clearKeyword = () => {
        setKeyword('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            
            <Form.Control
                type="text"
                name="q"
                className="mr-sm-2 ml-sm-5"
                ref={inputRef}
                onChange={(e) => setKeyword(e.target.value)}
            />
            
                    
               
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>

            <Button
                variant="link"
                onClick={clearKeyword}
                className="p-0 m-0"
                style={{
                    transform: 'translateX(-105px)',
                    color: '#b9c2ca',
                    fontSize: '1.2rem',
                }}
            >
                <i className="fas fa-times"></i>
            </Button>
        </Form>
    );
}

export default SearchBox;
