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
    carts[i].addEventListener('click',() => {
        increase(products[i]);
        displayCart();
        loadbutton();
        test();
    })
}

//increase incart
function decreaseItem(product){
    let cartItems =localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems[product.tag].incart != 1){
        if(cartItems[product.tag]== undefined){
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

//totalcost remove
function totalCostRemove(product){
    let cartCost=localStorage.getItem("totalCost");
    localStorage.setItem("totalCost",cartCost-product.price);
}
//totalcost dell
function totalCostDell(product){
    let tcartItems =localStorage.getItem('productsInCart');
    tcartItems = JSON.parse(tcartItems);
    let cartCost=localStorage.getItem("totalCost");
    localStorage.setItem("totalCost",cartCost-product.price*tcartItems[product.tag].incart);
}


//display cart
function displayCart(){
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    let productContainer=document.querySelector("#body-carts");
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
                            <div>${item.name}</div>
                        </div>
                        <div class="quantity">
                            <div class="minus ${item.tag}">
                                -
                            </div>
                            ${item.incart}
                            <div class="add ${item.tag}">
                                +
                            </div>
                        </div>
                        <div class="price-product">$${item.price}.00</div>
                        <div class="total">$${item.price*item.incart}.00</div>
                        <button class="del ${item.tag}">x</button>
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
    }
    else
    {
        //let Container=document.querySelector("#body-carts");
        productContainer.innerHTML=`<div class="empty">
        THE CART IS NOW EMPTY. SELECT SOME PRODUCTS TO BUY BEFORE CHECKING OUT.
        </div>`
    }
    let cartCost=localStorage.getItem("totalCost");
    var obj=document.getElementsByClassName("price");
    for (let j=0;j<obj.length;j++){
        obj[j].innerHTML=cartCost;
    }

}

// increase item
function increase(product){
    setItem(product)
    totalCost(product);
    displayCart();
    loadbutton()
}

//decrease item
function decrease(product){
    decreaseItem(product)
    totalCostRemove(product);
    displayCart();
    loadbutton()
}

//remove item
function remove(tag){
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    localStorage.removeItem("productsInCart");
    Object.values(cartItem).map(item =>{
        if(item.tag != tag)
        {
            let tcartItems =localStorage.getItem('productsInCart');
            tcartItems = JSON.parse(tcartItems);
            if(tcartItems != null){
                if(tcartItems[item.tag]== undefined){
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
    displayCart();
}


//open close cart
function test(){
    document.getElementsByClassName("popup-cart")[0].style.display = "block";
}
function exit(){
    document.getElementsByClassName("popup-cart")[0].style.display = "none";
}

function loadbutton(){
    //click add
    //let btn=document.getElementsByClassName("btn-cart");
    //btn[0].addEventListener('click',()=>{
    //    let productContainer=document.querySelector(".products");
    //    productContainer.innerHTML='<div id="snipcart-sub-content"><div class="snipcart-step"><div class="snip-cols snip-layout__content"><div id="snipcart-guest-checkout-container" class="snip-col snip-col--right snip-col--half"><h2 class="snip-static__title">Checkout as a guest</h2><p class="snip-static__content">Checkout as a guest if you dont want to create an account for this purchase. Please note that your information wont be saved for your next orders.</p><a href="#" id="snipcart-guest-checkout" class="snip-btn snip-btn--highlight snip-btn--full">Checkout</a></div><div id="snipcart-login-form-container" class="snip-col snip-col--half"><h2 class="snip-static__title">Sign in</h2><form class="snip-static__content"><div data-for="email" class="snip-form__container snip-form__container--input"><label for="snipcart-login-email" class="snip-form__label">Email</label><input type="text" name="email" id="snipcart-login-email"></div><div data-for="password" class="snip-form__container snip-form__container--input"><label for="snipcart-login-password" class="snip-form__label">Password</label><input type="password" name="password" id="snipcart-login-password"></div><a href="#" id="snipcart-login-forgotpassword-link" class="snip-static__link">I forgot my password</a><a href="#" id="snipcart-login-submit" class="snip-btn snip-btn--full">Log in</a><button type="submit" style="display: none"></button></form></div><div id="snipcart-newaccount-form-container" class="snip-col snip-col--half"><h2 class="snip-static__title">Create a login</h2><form class="snip-static__content"><div data-for="email" class="snip-form__container snip-form__container--input"><label for="snipcart-newaccount-email" class="snip-form__label">Email</label><input type="text" name="email" id="snipcart-newaccount-email" autocomplete="off"></div><div data-for="password" class="snip-form__container snip-form__container--input"><label for="snipcart-newaccount-password" class="snip-form__label">Password</label><input type="password" name="password" id="snipcart-newaccount-password" autocomplete="off"></div><div data-for="confirm" class="snip-form__container snip-form__container--input"><label for="snipcart-newaccount-confirm" class="snip-form__label">Confirm password</label><input type="password" name="confirm" id="snipcart-newaccount-confirm" autocomplete="off"></div><a id="snipcart-newaccount-submit" class="snip-btn snip-btn--full">Create a login</a><button type="submit" style="display: none"></button></form></div></div></div></div>';
    //})


    var add_array = new Array();
    for (let i=0;i<4;i++)
    {
        let a='.add.'+products[i].tag;
        add_array[i]=document.querySelector(a);
        if(add_array[i])
        {
            add_array[i].addEventListener('click',() => {
                increase(products[i]);
                //loadbutton();
                test();
            })
        }
    }

    //click minus
    var minus_array = new Array();
    for (let i=0;i<4;i++)
    {
        let a='.minus.'+products[i].tag;
        minus_array[i]=document.querySelector(a);
        if(minus_array[i])
        {
            minus_array[i].addEventListener('click',() => {
                decrease(products[i]);
                //loadbutton();
                test();
            })
        }
    }
    //click del
    var dell_array = new Array();
    for (let i=0;i<4;i++)
    {
        let a='.del.'+products[i].tag;
        dell_array[i]=document.querySelector(a);
        if(dell_array[i])
        {
            dell_array[i].addEventListener('click',() => {
                totalCostDell(products[i])
                remove(products[i].tag);
                loadbutton()
            })
        }
    }
}

displayCart();
loadbutton()