import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Reviewitem from '../Reviewitem/Reviewitem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handelPlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();

        console.log('place order')
    }

    const removeProduct = (productKey) => {
        // console.log('remove clicked', productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    let thankYou;  
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
            <div className='product-container'>
                {
                    cart.map(pd => <Reviewitem
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}></Reviewitem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handelPlaceOrder} className='main-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;