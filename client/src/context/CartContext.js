import React from 'react';
import {
    products,
    increaseCart,
    decreaseCart,
    removeCart
} from '../helper/cartHelper'
import getLocalStorage from '../helper/localStorage'


const CartContext = React.createContext('light');

class CartContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCost: getLocalStorage("totalCost","string") ? getLocalStorage("totalCost","string") : "0.00",
            isBlock: false,
            item: getLocalStorage("productsInCart","object")
        }
    }
    cartClick=()=> {
        this.setState({
            totalCost: getLocalStorage("totalCost","string") ? getLocalStorage("totalCost","string") : "0.00",
            isBlock: !this.state.isBlock,
        })
    }

    ProductClick=(i)=> {
        const id = i.target.id;
        const productId = id.split('btn_add_to_cart_')[1];
        const sp = products.find(p => p._id.$oid === productId);
        increaseCart(sp);
        this.setState({
            totalCost: getLocalStorage("totalCost","string") ? getLocalStorage("totalCost","string") : "0.00",
            isBlock: !this.state.isBlock,
            item: getLocalStorage("productsInCart","object")
        })
    }

    addClick=(i)=> {
        const id = i.target.id;
        const productId = id.split('btn_add_')[1];
        const sp = products.find(p => p._id.$oid === productId);
        increaseCart(sp);
        this.setState({
            totalCost: getLocalStorage("totalCost","string") ? getLocalStorage("totalCost","string") : "0.00",
            item: getLocalStorage("productsInCart","object")
        })
    }

    minusClick=(i)=> {
        const id = i.target.id;
        const productId = id.split('btn_minus_')[1];
        const sp = products.find(p => p._id.$oid == productId);
        decreaseCart(sp);
        this.setState({
            totalCost: getLocalStorage("totalCost","string") ? getLocalStorage("totalCost","string") : "0.00",
            item: getLocalStorage("productsInCart","object")
        })
    }

    delClick=(i)=> {
        const id = i.target.id;
        const productId = id.split('btn_del_')[1];
        const sp = products.find(p => p._id.$oid === productId);
        removeCart(sp.tag);
        this.setState({
            totalCost: getLocalStorage("totalCost","string") ? getLocalStorage("totalCost","string") : "0.00",
            item: getLocalStorage("productsInCart","object")
        })
    }
    render() {
        return (
            <CartContext.Provider value={{
                state: this.state,
                onClick: this.cartClick,
                addClick: this.addClick,
                minusClick: this.minusClick,
                delClick: this.delClick,
                ProductClick: this.ProductClick
            }}>
                {
                    this.props.children
                }
            </CartContext.Provider>
        )
    }
}

export {
    CartContext,
    CartContextProvider
}


