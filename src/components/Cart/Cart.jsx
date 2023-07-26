import {MdClose} from "react-icons/md"
import {BsCartX} from "react-icons/bs"
import CartItem from "./CartItem/CartItem"
import "./Cart.scss";
import { useContext } from "react";
import { Context } from "../../utils/context";
import { loadStripe } from '@stripe/react-stripe-js';
import { makePayementRequest } from "../../utils/api";
const Cart = () => {
   const {cartItems,cartSubTotal,setShowCart}= useContext(Context)
   const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
   const handlePayment = async () => {
    try {
        const stripe = await stripePromise;
        const res = await makePayementRequest.post("/api/orders", {
            products: cartItems,
        });
        await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
        });
    } catch (err) {
        console.log(err);
    }
};
    return <div className="cart-panel">
        <div className="opac-layer"
                onClick={() => setShowCart(false)}></div>
        <div className="cart-content">
            <div className="cart-header">
                <span className="heading">Shopping Cart</span>
                <span className="close-btn" onClick={()=>setShowCart(false)}>
             <MdClose/>
             <span className="text">close</span>
                </span>
            </div>
          { !cartItems?.length && <div className="empty-cart">
                <BsCartX />
                <span>No Products in cart.</span>
                <button className="return-cta">RETURN TO SHOP</button>
            </div>}
          { !!cartItems?.length&&  <>
            <CartItem/>
             <div className="cart-footer">
                <div className="subtotal">
                    <span className="text">Subtotal:</span>
                    <span className="text total">&#8377;{cartSubTotal}</span>
                </div>
                <div className="button">
                    <button className="checkout-cta"  onClick={handlePayment}>Checkout</button>
                </div>
             </div>
            </>}
        </div>
    </div>;
};

export default Cart;
