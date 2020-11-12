import getLocalStorage from '../helper/localStorage'

let products = [
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
const setItem = (product) => {
    let cartItems = getLocalStorage("productsInCart","object");
    if (cartItems !== null) {
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }
    else {
        product.incart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

const totalCost = () => {
    let cartItem = getLocalStorage("productsInCart","object");
    let k = 0;
    if (cartItem) {
        Object.values(cartItem).map(item => {
            k = k + item.price * item.incart;
            return k;
        });
    }
    k = parseFloat(k).toFixed(2);
    localStorage.setItem("totalCost", k);
}

const decreaseItem = (product) => {
    let cartItems = getLocalStorage("productsInCart","object");
    if (cartItems[product.tag].incart !== 1) {
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart -= 1;
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }
    else {
        removeCart(product.tag);
    }

}

const increaseCart = (product) => {
    setItem(product)
    totalCost();
}

const decreaseCart = (product) => {
    decreaseItem(product)
    totalCost();
}

const removeCart = (tag) => {
    let cartItem = getLocalStorage("productsInCart","object");
    localStorage.removeItem("productsInCart");
    Object.values(cartItem).map(item => {
        if (item.tag !== tag) {
            let tcartItems = getLocalStorage("productsInCart","object");
            if (tcartItems !== null) {
                if (tcartItems[item.tag] === undefined) {
                    tcartItems = {
                        ...tcartItems,
                        [item.tag]: item
                    }
                }
                tcartItems[item.tag].incart = item.incart;
            }
            else {
                tcartItems = {
                    [item.tag]: item
                }
            }

            localStorage.setItem("productsInCart", JSON.stringify(tcartItems));
        }
    })
    totalCost();
}

export {
    products,
    increaseCart,
    decreaseCart,
    removeCart
}