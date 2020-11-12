import {
    products
} from '../helper/cartHelper';

import { CartContext } from '../context/CartContext'

function RenderProduct(product) {
    const src = `./img/${product.tag}.jpg`
    const id = `btn_add_to_cart_${product._id}`
    return (
        <div className={product.tagid}>
            <img src={src} alt="" />
            <h2>{product.name}</h2>
            <p>{product.title}</p>
            <div>
                <div>{parseFloat(product.price).toFixed(2)}</div>
                <button className="button" id={id} onClick={product.onClick}>
                    Add to cart
				</button>
            </div>
        </div>
    )
}

/* function HomeBody(props) {
    let k = 0;
    let sptag;
    return (
        <main className="main">
            <img src="./img/background.svg" alt="" id="backgroundimg" />
            <div className="tieude">
                <h3>REDISCOVER</h3>
                <h2>Fishkeeping</h2>
                <p>An <b>exclusive collection of bettas</b> available for everyone.</p>
            </div>
            <div className="container">
                <div className="list-sp">
                    {
                        products.map(product => {
                            if (k % 2 === 0) {
                                sptag = "sp";
                            } else {
                                sptag = "sp2";
                            }
                            k = k + 1;
                            return (
                                <RenderProduct name={product.name} title={product.title}
                                    price={product.price} tag={product.tag}
                                    _id={product._id.$oid} tagid={sptag} onClick={props.onClick} />
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
} */

const HomeBody = (props) => {
    let k = 0;
    return (
        <CartContext.Consumer>
            {values => (
                <main className="main">
                    <img src="./img/background.svg" alt="" id="backgroundimg" />
                    <div className="tieude">
                        <h3>REDISCOVER</h3>
                        <h2>Fishkeeping</h2>
                        <p>An <b>exclusive collection of bettas</b> available for everyone.</p>
                    </div>
                    <div className="container">
                        <div className="list-sp">
                            {
                                products.map(product => {
                                    let sptag;
                                    k % 2 === 0 ? sptag = "sp" : sptag = "sp2"
                                    k = k + 1;
                                    return (
                                        <RenderProduct name={product.name} title={product.title}
                                            price={product.price} tag={product.tag}
                                            _id={product._id.$oid} tagid={sptag} onClick={values.ProductClick} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </main>
            )}
        </CartContext.Consumer>
    )
}


export default HomeBody;