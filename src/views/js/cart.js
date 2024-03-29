let products =[
    {
        id: 1,
        name:'Halfmoon Betta',
        tag:'halfmoon',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 25.00,
        incart: 0
    },
    {
        id: 2,
        name:'Dragon Scale Betta',
        tag:'dragonscale',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 35.00,
        incart: 0
    },
    {
        id: 3,
        name:'Crowntail Betta',
        tag:'crowntail',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 7.50,
        incart: 0
    },
    {
        id: 4,
        name:'Veiltail Betta',
        tag:'veiltail',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 5.00,
        incart: 0
    }
];
//event click
function showProduct(){
    let sp=document.querySelector(".list-sp");
    let k=0;
    let t;
    sp.innerHTML=``;
    products.forEach(product => {
        if (k%2===0){
            t='sp';
        }
        else
        {
            t='sp2';
        }
        
        sp.innerHTML+=`
                    <div class="${t}">
                        <img src="./img/${product.tag}.jpg" alt="">
                        <h2>${product.name}</h2>
                        <p>${product.title}</p>
                        <div>
                            <div>$ ${parseFloat(product.price).toFixed(2)}</div>
                            <!--<input type="button" class="button" value="Add to cart">-->
                            <button class="button" id="btn_add_to_cart_${product.id}">
                                Add to cart
                            </button>
                        </div>
                    </div>
        `;
        k=k+1;
    });
}
//increase incart
function decreaseItem(product){
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
        remove(product.tag);
    }

}
//setItem incart
function setItem(product){
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
//totalCost
function totalCost(){
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let k=0;
    if(cartItem)
    {
        Object.values(cartItem).map(item =>{
            k=k+item.price*item.incart;
            
        });
    }
    k=parseFloat(k).toFixed(2);
    localStorage.setItem("totalCost",k);
}
//display cart
function displayCart(){
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let productContainer=document.querySelector("#body-carts");
    let subtotal = document.querySelector("#container_price");
    if(cartItem &&productContainer){
        productContainer.innerHTML='';
        productContainer.innerHTML +=`<div class="product-header">
        <h5 class="product-title">ITEM</h5>
        <h5 class="quantity">QUANTITY</h5>
        <h5 class="price-product">PRICE</h5>
        <h5 class="total">TOTAL</h5>
        <h5 class="del" style="cursor: default;"></h5>
        </div>`
        Object.values(cartItem).map(item =>{
            productContainer.innerHTML +=`
               <div class="products">
                    <div class="product">
                        <div class=product-title>
                            <img src="./img/${item.tag}.jpg">
                            <div><b>${item.name}</b></div>
                        </div>
                        <div class="quantity">
                            <div class="minus" id="btn_minus_${item.id}">
                                -
                            </div>
                            ${item.incart}
                            <div class="add" id="btn_add_${item.id}">
                                +
                            </div>
                        </div>
                        <div class="price-product" style="color: #999;">$${parseFloat(item.price).toFixed(2)}</div>
                        <div class="total">$${parseFloat(item.price*item.incart).toFixed(2)}</div>
                        <button class="del" id="btn_del_${item.id}" style="font-size: 30px;">x</button>
                    </div>
               </div>
            `
        });
        productContainer.innerHTML+=`<div class="promo">
                                        <a href=""> Promo Code</a>    
                                    </div>
                                    <div class="clear"></div>
                                    <div>
                                        <button class="btn-cart">NEXT STEP</button>
                                    </div>
                                    <div class="clear"></div>`;
                                    subtotal.style.visibility ="visible"; 
    }
    else
    {
        subtotal.style.visibility ="hidden";    
        productContainer.innerHTML=`<div class="empty">
        THE CART IS NOW EMPTY. SELECT SOME PRODUCTS TO BUY BEFORE CHECKING OUT.
        </div>`
    }
    let cartCost=localStorage.getItem("totalCost");
    let obj=document.getElementsByClassName("price");
    for (let j=0;j<obj.length;j++){
        obj[j].innerHTML=cartCost;
    }
}
// increase item
function increaseCart(product){
    setItem(product)
    totalCost();
    displayCart();
    loadButton();
}
//decrease item
function decreaseCart(product){
    decreaseItem(product)
    totalCost();
    displayCart();
    loadButton();
}
//remove item
function removeCart(tag){
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
    displayCart();
}
//open close cart
function openCart(){
    document.getElementsByClassName("popup-cart")[0].style.display = "block";
}
function closeCart(){
    document.getElementsByClassName("popup-cart")[0].style.display = "none";
}
function loadButton(){
    let btn_add_item= document.getElementsByClassName("add");
    Array.from(btn_add_item).forEach(btn=>{
        btn.addEventListener('click',e =>{
            const id=e.target.id;
            const productId=id.split('btn_add_')[1];
            const sp=products.find(p=>p.id===parseInt(productId));
            increaseCart(sp);
            openCart();
        })
    })

    //click minus
    let btn_minus_item= document.getElementsByClassName("minus");
    Array.from(btn_minus_item).forEach(btn=>{
        btn.addEventListener('click',e =>{
            const id=e.target.id;
            const productId=id.split('btn_minus_')[1];
            const sp=products.find(p=>p.id===parseInt(productId));
            decreaseCart(sp);
            openCart();
        })
    })
    //click del
    let btn_del_item= document.getElementsByClassName("del");
    Array.from(btn_del_item).forEach(btn=>{
        btn.addEventListener('click',e =>{
            const id=e.target.id;
            const productId=id.split('btn_del_')[1];
            const sp=products.find(p=>p.id===parseInt(productId));
            removeCart(sp.tag);
            loadButton();
        })
    })
}
function loadAddToCart(){
    let btn_add= document.getElementsByClassName("button");
    Array.from(btn_add).forEach(btn=>{
        btn.addEventListener('click',e =>{
            console.log("a");
            const id=e.target.id;
            const productId=id.split('btn_add_to_cart_')[1];
            const sp=products.find(p=>p.id===parseInt(productId));
            increaseCart(sp);
            displayCart();
            loadButton();
            openCart();
        })
    })
}
function clickOutsideCart(){
    document.addEventListener('click', function (event) {
        if (!event.target.closest('#inside-cart')) {
            if (!event.target.closest('.button')&&!event.target.closest('#cart')&&!event.target.closest('.add')&&!event.target.closest('.minus')&&!event.target.closest('.del'))
            {
                document.getElementsByClassName("popup-cart")[0].style.display = "none";
            }
        }
    }, false);
}
showProduct();
displayCart();
loadButton();
totalCost();
loadAddToCart();
clickOutsideCart();


