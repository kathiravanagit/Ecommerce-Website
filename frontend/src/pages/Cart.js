import {Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import AddressForm from '../components/AddressForm';

export default function Cart({cartItems, setCartItems}) {
    const [complete, setComplete] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);

    function increaseQty(item) {
        if (item.product.stock == item.qty) {
            return;
        }
        const updatedItems = cartItems.map((i) => {
            if(i.product._id == item.product._id) {
                i.qty++
            }
            return i;
        })
        setCartItems(updatedItems)
    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((i) => {
                if(i.product._id == item.product._id) {
                    i.qty--
                }
                return i;
            })
            setCartItems(updatedItems)
        }
    }

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => {
            if(i.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItems)
    }

    function placeOrderHandler() {
        setShowAddressForm(true);
    }

    function handleAddressSubmit(addressData) {
        const orderData = {
            cartItems: cartItems,
            shippingAddress: addressData
        };

        fetch(process.env.REACT_APP_API_URL+'/order', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
            return response.json();
        })
        .then(() => { 
            setCartItems([]); 
            setComplete(true);
            setShowAddressForm(false);
            toast.success("Order placed successfully! Your items will be delivered to the provided address.");
        })
        .catch(error => {
            console.error('Error placing order:', error);
            toast.error("Failed to place order. Please try again.");
            setShowAddressForm(false);
        });
    }

    function handleAddressCancel() {
        setShowAddressForm(false);
    }



    return  cartItems.length > 0 ? <Fragment>
                <div className="container container-fluid">
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {cartItems.map((item) =>
                            (<Fragment key={item.product._id}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row align-items-center">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.product.images[0].image} alt={item.product.name} height="90" width="115" />
                                        </div>

                                        <div className="col-8 col-lg-3">
                                            <Link to={"/product/"+item.product._id} >{item.product.name}</Link>
                                            {item.size && (
                                                <div className="mt-1">
                                                    <small className="text-muted">Size: {item.size}</small>
                                                </div>
                                            )}
                                        </div>


                                        <div className="col-6 col-lg-2 mt-2 mt-lg-0">
                                            <p id="card_item_price">${item.product.price}</p>
                                        </div>

                                        <div className="col-6 col-lg-3 mt-2 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />
                                                <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-1 mt-2 mt-lg-0 text-center">
                                            <i id="delete_cart_item" onClick={() => removeItem(item)} className="fa fa-trash btn btn-danger"></i>
                                        </div>

                                    </div>
                                </div>
                            </Fragment>)
                            )}
                        
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item)=> (acc + item.qty), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${Number(cartItems.reduce((acc,item)=> (acc + item.product.price * item.qty), 0)).toFixed(2)}</span></p>

                                <hr />
                                <button id="checkout_btn" onClick={placeOrderHandler} className="btn btn-primary btn-block">Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
                {showAddressForm && (
                    <AddressForm 
                        onAddressSubmit={handleAddressSubmit}
                        onCancel={handleAddressCancel}
                    />
                )}
            </Fragment> : (!complete ? <h2 className='mt-5 text-center'>Your Cart is Empty!</h2> 
            : <Fragment>
                <h2 className='mt-5 text-center'>Order Complete!</h2>
                <p className='text-center'>Your order has been placed successfully.</p>
                <p className='text-center'>We will deliver your items to the address you provided.</p>
            </Fragment>)
}