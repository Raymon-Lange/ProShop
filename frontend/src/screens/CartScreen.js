import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'


const CartScreen = () => {
    const params = useParams()
    const prouctId = params.id;

    const location = useLocation()
    
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    console.log(qty)

  return <div>CartScreen</div>
}

export default CartScreen