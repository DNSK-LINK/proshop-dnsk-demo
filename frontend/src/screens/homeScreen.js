import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Product from '../components/product'
import Loader from '../components/loader'
import Message from '../components/message'
import Paginate from '../components/paginate'
import ProductCarousel from '../components/productCarousel'
import { listProducts } from '../actions/productActions'

function HomeScreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages } = productList
    // console.log('KEYWORD:', keyword)
    

    const location = useLocation()
    const keyword = new URLSearchParams(location.search).get('keyword')
    const page = new URLSearchParams(location.search).get('page')

    // console.log('HomeScreen PAGE:', page)
    // console.log('HomeScreen PAGES:', pages)
    useEffect(() => {
        const pageNumber = Number(page);
        // console.log('homeScreen useEffect pageNumber:', pageNumber)
        // console.log('homeScreen useEffect page:', page)
        if (isNaN(pageNumber) || pageNumber <= 0) {
            dispatch(listProducts(keyword, 1));
            // console.log('homeScreen useEffect "IF" listProducts keyword:', keyword)
            // console.log('homeScreen useEffect "IF" listProducts page:', pageNumber)
        } else {
            dispatch(listProducts(keyword, page));
            // console.log('homeScreen useEffect "ELSE" listProducts keyword:', keyword)
            // console.log('homeScreen useEffect "ELSE" listProducts page:', pageNumber)
        }

    }, [dispatch, keyword, page]);

    
    return (
        <div className='latest-products-container'>
            {(!keyword || keyword === 'null') && <ProductCarousel />}
            
            <h1>Latest Products (UPDATED)</h1>
            {loading ? <Loader /> 
                : error ? <Message variant='danger'>{error}</Message> 
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>
                }
        </div>
    )
}

export default HomeScreen