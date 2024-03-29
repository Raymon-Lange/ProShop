import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate,useParams } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listProducts,  deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const pageNumber = useParams() || 1

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector((state) => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete,} = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const{  loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct,} = productCreate


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        dispatch(listProducts())
        
        if (successCreate) {
            history(`/admin/product/${createdProduct._id}/edit`)
            dispatch({ type: PRODUCT_CREATE_RESET })
        } else {
            dispatch(listProducts())
        }
        
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber,
    ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        const product = {
            name: "New Product",
            image: "/images/Rogue.png",
            description: "New Product Description",
            brand: "Brand Name",
            category: "Product Category",
            price: 999.99,
            countInStock: 1
        }

        console.log(product)

        dispatch(createProduct(product))
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen