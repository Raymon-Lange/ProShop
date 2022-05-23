import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import axios  from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await axios.get('/products/')
      setProducts(data)
    }

    fetchProducts()
  }, []) //defauting to no depenacys

  return (
    <>
        <h1>Lastest products</h1>
        <Row>
            {products.map((product) =>(
                <Col key={product._id} sm={12} md={6} lg={4}>
                    <Product product={product} />
                </Col>
                ))}
        </Row>
    </>
  )
}

export default HomeScreen