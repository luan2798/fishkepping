import './css/header.css'; 
import './css/media.css'
import './css/cart.css'
import React from 'react';
import HomeHeader from './component/HomeHeader'
import HomeBody from './component/HomeBody'
import HomeFooter from './component/HomeFooter'
import Cart from './component/Cart'
import CartContext from './context/CartContext'




let products =[
    {
        "_id": {
            "$oid": "5f78253e2eeba6a9eaadb17a"
        },
        "name": "Halfmoon Betta",
        "tag": "halfmoon",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 25,
        "incart": 0
    },
    {
        "_id": {
            "$oid": "5f782dfd076a0b1de8c8cdc8"
        },
        "name": "Dragon Scale Betta",
        "tag": "dragonscale",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 35,
        "incart": 0
    },
    {
        "_id": {
            "$oid": "5f782dff076a0b1de8c8cdc9"
        },
        "name": "Crowntail Betta",
        "tag": "crowntail",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 7.5,
        "incart": 0
    },
    {
        "_id": {
            "$oid": "5f783227076a0b1de8c8cdca"
        },
        "name": "Veiltail Betta",
        "tag": "veiltail",
        "title": "The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees",
        "price": 5,
        "incart": 0
    }
]
const setItem=(product)=>{
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems !== null){
        if(cartItems[product.tag]=== undefined){
            cartItems={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart +=1;
    }
    else
    {
        product.incart=1;
        cartItems ={
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

const totalCost=()=>{
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let k=0;
    if(cartItem)
    {
        Object.values(cartItem).map(item =>{
			k=k+item.price*item.incart;  
			return k;
        });
    }
    k=parseFloat(k).toFixed(2);
    localStorage.setItem("totalCost",k);
}

const decreaseItem=(product)=>{
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems[product.tag].incart !== 1){
        if(cartItems[product.tag]=== undefined){
            cartItems={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart -=1;
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }
    else
    {
        removeCart(product.tag);
    }

}

const increaseCart=(product)=>{
    setItem(product)
	totalCost();
}

const decreaseCart=(product)=>{
    decreaseItem(product)
    totalCost();
}

const removeCart=(tag)=>{
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    localStorage.removeItem("productsInCart");
    Object.values(cartItem).map(item =>{
        if(item.tag !== tag)
        {
            let tcartItems =localStorage.getItem('productsInCart');
            tcartItems = JSON.parse(tcartItems);
            if(tcartItems !== null){
                if(tcartItems[item.tag]=== undefined){
                    tcartItems={
                        ...tcartItems,
                        [item.tag]: item
                    }
                }
                tcartItems[item.tag].incart =item.incart;
            }
            else
            {
                tcartItems ={
                    [item.tag]: item
                }
            }
            
            localStorage.setItem("productsInCart", JSON.stringify(tcartItems));
        }
    })  
    totalCost();
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
          totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost"):"0.00",
          isBlock: false,
          item: JSON.parse(localStorage.getItem("productsInCart"))
        };
        this.ProductClick=this.ProductClick.bind(this);
        this.cartClick=this.cartClick.bind(this);
        this.addClick=this.addClick.bind(this);
        this.minusClick=this.minusClick.bind(this);
        this.delClick=this.delClick.bind(this);
    }
    cartClick(){
        this.setState({
            totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost"):"0.00",
			isBlock: !this.state.isBlock,
		})
    }
	ProductClick(i){
		const id=i.target.id;
		const productId=id.split('btn_add_to_cart_')[1];
		const sp=products.find(p=>p._id.$oid===productId);
        increaseCart(sp);
		this.setState({
            totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost"):"0.00",
            isBlock: !this.state.isBlock,
            item: JSON.parse(localStorage.getItem("productsInCart"))
		})
    }
    addClick(i){
		const id=i.target.id;
		const productId=id.split('btn_add_')[1];
		const sp=products.find(p=>p._id.$oid===productId);
        increaseCart(sp);
		this.setState({
            totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost"):"0.00",
            item: JSON.parse(localStorage.getItem("productsInCart"))
		})
    }

    minusClick(i){
		const id=i.target.id;
        const productId=id.split('btn_del_')[1];
        const sp=products.find(p=>p._id==productId);
        decreaseCart(sp);
		this.setState({
            totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost"):"0.00",
            item: JSON.parse(localStorage.getItem("productsInCart"))
		})
    }

    delClick(i){
		const id=i.target.id;
		const productId=id.split('btn_del_')[1];
		const sp=products.find(p=>p._id.$oid===productId);
        removeCart(sp.tag);
		this.setState({
            totalCost: localStorage.getItem("totalCost") ? localStorage.getItem("totalCost"):"0.00",
            item: JSON.parse(localStorage.getItem("productsInCart"))
		})
    }

  	render(){
		return (
		<div className="App">
            <CartContext.Provider value={{
                state: this.state,
                onClick: this.cartClick,
                addClick: this.addClick,
                minusClick: this.minusClick,
                delClick: this.delClick
            }}>
                <HomeHeader value={this.state.totalCost} onClick={this.cartClick}/>
                <Cart />
                <HomeBody onClick={this.ProductClick}/>
                <HomeFooter/>
            </CartContext.Provider>
		</div>
		);
	}
}

export default App;
