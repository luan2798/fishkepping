let products=[];
const pageLoading=()=>{
    $(".list-sp").html(`
        <div class=container>
            <div class="loader"></div>
        </div>
    `);
    $(".list-sp").css("width","100%");
}
const getProducts=() =>{
    pageLoading();
    $.ajax({ 
        type : "GET", 
        url : 'http://localhost:3000/products', 
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', `${localStorage.getItem('token')}`,false);},
        success : function(data) { 
            products = data;
            $(".list-sp").empty();
            showProduct();
        }, 
        error : function(result) {  
        } 
    }); 
};
// showproduct
const showProduct=()=>{
    let k=0;
    let t;
    products.forEach(product => {
        if (k%2===0){
            t='sp';
        }
        else
        {
            t='sp2';
        }
        $(".list-sp").append(`
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
        `)
        k=k+1;
    });
    loadAddToCart();
}
//increase incart
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
        remove(product.tag);
    }

}
//setItem incart
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
//totalCost
const totalCost=()=>{
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
const displayCart=()=>{
    let cartItem =localStorage.getItem("productsInCart");
    cartItem=JSON.parse(cartItem);
    if(cartItem){
        $("#body-carts").empty();
        $("#body-carts").append(`<div class="product-header">
        <h5 class="product-title">ITEM</h5>
        <h5 class="quantity">QUANTITY</h5>
        <h5 class="price-product">PRICE</h5>
        <h5 class="total">TOTAL</h5>
        <h5 class="del" style="cursor: default;"></h5>
        </div>`
        );
        Object.values(cartItem).map(item =>{
            $("#body-carts").append(`
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
            `)
        });
        $("#body-carts").append(`<div class="promo">
                                        <a href=""> Promo Code</a>    
                                    </div>
                                    <div class="clear"></div>
                                    <div>
                                        <button class="btn-cart">NEXT STEP</button>
                                    </div>
                                    <div class="clear"></div>`
        );
        $("#container_price").css("visibility","visible");
    }
    else
    {
        $("#container_price").css("visibility","hidden");    
        $("#body-carts").html(`<div class="empty">
        THE CART IS NOW EMPTY. SELECT SOME PRODUCTS TO BUY BEFORE CHECKING OUT.
        </div>`);
    }
    let cartCost=localStorage.getItem("totalCost");
    $(".price").html(cartCost);
}
// increase item
const increaseCart=(product)=>{
    setItem(product)
    totalCost();
    displayCart();
    loadButton();
}
//decrease item
const decreaseCart=(product)=>{
    decreaseItem(product)
    totalCost();
    displayCart();
    loadButton();
}
//remove item
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
    displayCart();
}
//open close cart
const openCart=()=>{
    $(".popup-cart").css("display","block");
}
const closeCart=()=>{
    $(".popup-cart").css("display","none");
}
const loadButton=()=>{
    $('.add').click(e =>{
        const id=e.target.id;
        const productId=id.split('btn_add_')[1];
        const sp=products.find(p=>p.id===parseInt(productId));
        increaseCart(sp);
    });
    //click minus
    $('.minus').click(e =>{
        const id=e.target.id;
        const productId=id.split('btn_minus_')[1];
        const sp=products.find(p=>p.id===parseInt(productId));
        decreaseCart(sp);
    });
    $('.del').click(e =>{
        const id=e.target.id;
        const productId=id.split('btn_del_')[1];
        const sp=products.find(p=>p.id===parseInt(productId));
        removeCart(sp.tag);
        loadButton();
    });
}
const loadAddToCart=()=>{
    $('.button').click(e =>{
        const id=e.target.id;
        const productId=id.split('btn_add_to_cart_')[1];
        const sp=products.find(p=>p.id===parseInt(productId));
        increaseCart(sp);
        displayCart();
        loadButton();
        openCart();
    });
}
const clickOutsideCart=()=>{
    $(document).click(function (e)
    {
        if (!e.target.closest('#inside-cart')) {
            if (!e.target.closest('.button')&&!e.target.closest('#cart')&&!e.target.closest('.add')&&!e.target.closest('.minus')&&!e.target.closest('.del'))
            {
                $(".popup-cart").hide();
            }
        }
    });
}
getProducts();
displayCart();
loadButton();
totalCost();
loadAddToCart();
clickOutsideCart();



