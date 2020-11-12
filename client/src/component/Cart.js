import React from 'react';
import CartContext from '../context/CartContext'

function ProductCart(props){
	let src=`./img/${props.tag}.jpg`
	let idminus=`btn_minus_${props._id}`
	let idmadd=`btn_add_${props._id}`
	let iddel=`btn_del_${props._id}`
	return(
		<div className="products">
            <div className="product">
                <div className="product-title">
                    <img src={src} alt=""/>
                    <div><b>{props.name}</b></div>
                </div>
                <div className="quantity">
                    <div className="minus" id={idminus} onClick={props.minusClick}>
                        -
                    </div>
                    {props.incart}
                    <div className="add" id={idmadd} onClick={props.addClick}>
                        +
                    </div>
                </div>
                <div className="price-product" >{parseFloat(props.price).toFixed(2)}</div>
                <div className="total">{parseFloat(props.price*props.incart).toFixed(2)}</div>
                <button className="del" id={iddel} onClick={props.delClick} >x</button>
            </div>
        </div>
	)
}

const Cart=(props)=>(
	<CartContext.Consumer>
		{values => (
			values.state.item ? 
			<div className={`popup-cart ${values.state.isBlock ? 'popup-cart-block' : ''}`}>
				<div className="container-cart">
					<div id="inside-cart">
						<div className="container" id="header-carts">
							<h2>MY CART</h2>
							<span className="container-price" id="container_price">
								<span>SUBTOTAL:</span>
								<span>$ <span className="price"> {values.state.totalCost}</span></span>
							</span>
							<button onClick={values.onClick}>x</button>
						</div>
						<div className="container" id="body-carts">
							<div class="product-header">
								<h5 class="product-title">ITEM</h5>
								<h5 class="quantity">QUANTITY</h5>
								<h5 class="price-product">PRICE</h5>
								<h5 class="total">TOTAL</h5>
								<h5 class="del" ></h5>
							</div>
							{
								Object.values(values.state.item).map(item => {
									return(
										<ProductCart name={item.name} title={item.title}
											price={item.price} tag={item.tag} incart={item.incart}
											_id={item._id.$oid} addClick={values.addClick}
											minusClick={values.minusClick} delClick={values.delClick}
										/>
									)
								})
							}
							<div class="promo">
								<a href="./"> Promo Code</a>    
							</div>
							<div class="clear"></div>
								<div>
									<button class="btn-cart">NEXT STEP</button>
									</div>
								<div class="clear"></div>
						</div>
						<div class="container" id="footer-cart">
							<img src="./img/lock.png"  alt=""/>
							<a href="./">POWERED AND SECURED BY <b>SNIPCART</b></a>
						</div>
					</div>
				</div>
			</div>
			:
			<div className={`popup-cart ${values.state.isBlock ? 'popup-cart-block' : ''}`}>
					<div className="container-cart">
						<div id="inside-cart">
							<div className="container" id="header-carts">
								<h2>MY CART</h2>
								<span className="container-price" id="container_price" style={{visibility: 'hidden'}}>
									<span>SUBTOTAL:</span>
									<span>$ <span className="price"> {values.state.totalCost}</span></span>
								</span>
								<button onClick={values.onClick}>x</button>
							</div>
							<div class="container" id="body-carts">
								<div class="empty" style={{color: '#999'}}>
									THE CART IS NOW EMPTY. SELECT SOME PRODUCTS TO BUY BEFORE CHECKING OUT.
								</div>
							</div>
							<div class="container" id="footer-cart">
								<img src="./img/lock.png"  alt=""/>
								<a href="./">POWERED AND SECURED BY <b>SNIPCART</b></a>
							</div>
						</div>
					</div>
				</div>
		)} 
	</CartContext.Consumer>
)

export default Cart;