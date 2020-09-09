let carts=document.querySelectorAll('.button');

let products =[
    {
        name:'Halfmoon Betta',
        tag:'halfmoon',
        price: 25,
        incart: 0
    },
    {
        name:'Dragon Scale Betta',
        tag:'dragonscale',
        price: 35,
        incart: 0
    },
    {
        name:'Crowntail Betta',
        tag:'crowntail',
        price: 7,
        incart: 0
    },
    {
        name:'Veiltail Betta',
        tag:'veiltail',
        price: 5,
        incart: 0
    }
];
//event click
for(let i=0;i<carts.length;i++){
    console.log("my loop");
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        displayCart();
        test();
    })
}

//function click
function cartNumbers(product){
    
    let productnumbers =localStorage.getItem('cartNumbers');
    
    productnumbers=parseInt(productnumbers);

    if(productnumbers){
        localStorage.setItem('cartNumbers',productnumbers+1);
    }
    else{
        localStorage.setItem('cartNumbers',1);
    }
    setItem(product);
}



//setItem incart
function setItem(product){
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag]== undefined){
            cartItems={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart +=1;
    }
    else
    {
        console.log(product);
        product.incart=1;
        cartItems ={
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//totalCost
function totalCost(product){
    let cartCost=localStorage.getItem("totalCost");
    if(cartCost !=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price)
    }else{
        localStorage.setItem("totalCost",product.price);
    }
}

// loadcartnumber
function loadcartnumber(){
    let productnumbers =localStorage.getItem('cartNumbers');
    if(productnumbers){
       document.querySelector('#container-price span').textContent=productnumbers;
    }
}
loadcartnumber();


//display cart
function displayCart(){
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let productContainer=document.querySelector(".products");
    if(cartItem &&productContainer){
        productContainer.innerHTML='';
        Object.values(cartItem).map(item =>{
            productContainer.innerHTML +=`
            <div class="product">
                <div class=product-title>
                    <img src="./img/${item.tag}.jpg">
                    <div>${item.name}</div>
                </div>
                <div class="quantity">
                    ${item.incart}
                </div>
                <div class="price-product">$${item.price}.00</div>
                <div class="total">$${item.price*item.incart}.00</div>
                <div class="del">x</div>
            </div>
            `
        });
    }
    let cartCost=localStorage.getItem("totalCost");
    var obj=document.getElementsByClassName("price");
    for (let j=0;j<obj.length;j++){
        obj[j].innerHTML=cartCost;
    }

}
displayCart()


//open close cart
function test(){
    document.getElementsByClassName("popup-cart")[0].style.display = "block";
}
function exit(){
    document.getElementsByClassName("popup-cart")[0].style.display = "none";
}
