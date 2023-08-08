import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    // console.log('Paginate KEYWORD:', keyword)
    // console.log('Paginate PAGE:', page)
    // console.log('Paginate PAGES:', pages)

    // if(keyword && keyword.includes('?keyword=')){
    //     keyword = keyword.split('?keyword=')[1].split('&')[0]
    // }

    // console.log('KEYWORD: ', keyword)
    return (pages > 1 && (
        <Pagination className='paginator-container'>
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer 
                    key={x + 1}
                   
                    to={!isAdmin ? 
                         {pathname: '/', search: `?keyword=${keyword}&page=${x + 1}`}
                         : { pathname: '/admin/productList', search: `?keyword=${keyword}&page=${x + 1}` } 
                        }
                >

                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            )

            )}
        </Pagination>
    ))
}

export default Paginate