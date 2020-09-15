let products =[
    {
        id: 1,
        name:'Halfmoon Betta',
        tag:'halfmoon',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 25,
        incart: 0
    },
    {
        id: 2,
        name:'Dragon Scale Betta',
        tag:'dragonscale',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 35,
        incart: 0
    },
    {
        id: 3,
        name:'Crowntail Betta',
        tag:'crowntail',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 7,
        incart: 0
    },
    {
        id: 4,
        name:'Veiltail Betta',
        tag:'veiltail',
        title: 'The Halfmoon betta is arguably one of the prettiest betta species. It is recognized by its large tail that can flare up to 180 degrees',
        price: 5,
        incart: 0
    }
];
//event click

function showproduct(){
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
                            <div>$ ${product.price}.00</div>
                            <!--<input type="button" class="button" value="Add to cart">-->
                            <button class="button" id="${product.id}">
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
    localStorage.setItem("totalCost",k);
}
totalCost();
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
                        <button class="del ${item.tag}" style="font-size: 30px;">x</button>
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
        //let Container=document.querySelector("#body-carts");
        subtotal.style.visibility ="hidden";    
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
    totalCost();
    displayCart();
    loadbutton()
}

//decrease item
function decrease(product){
    decreaseItem(product)
    totalCost();
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
    totalCost();
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
                remove(products[i].tag);
                loadbutton();
            })
        }
    }
}
showproduct();
displayCart();
loadbutton();
let carts=document.querySelectorAll('.button');
    for(let i=0;i<carts.length;i++){
        carts[i].addEventListener('click',() => {
            increase(products[i]);
            displayCart();
            loadbutton();
            test();
    })
}
