import './css/header.css';
import './css/media.css'
import './css/cart.css'
import React from 'react';
import HomeHeader from './component/HomeHeader'
import HomeBody from './component/HomeBody'
import HomeFooter from './component/HomeFooter'
import Cart from './component/Cart'
import {CartContextProvider} from './context/CartContext'






class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost") : "0.00",
            isBlock: false,
            item: JSON.parse(localStorage.getItem("productsInCart"))
        };
    }
    ProductClick(i) {
        
    }

    render() {
        return (
            <div className="App">
                <CartContextProvider>
                    <HomeHeader value={this.state.totalCost} onClick={this.cartClick} />
                    <Cart />
                    <HomeBody onClick={this.ProductClick} />
                    <HomeFooter />
                </CartContextProvider>
            </div>
        );
    }
}

export default App;
