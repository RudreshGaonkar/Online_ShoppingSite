export let cart = JSON.parse(localStorage.getItem('cart'));

if(cart === null || cart === undefined)
{
    cart = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 1,
        deliveryOptionId : '1'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity : 1,
        deliveryOptionId : '1'
    }
    ];
    // cart = [];
    saveToStorage();
}

export function addToCart(productId,quantity)
{
    let matchingItem;

    cart.forEach((cartitem) => {
        if(productId === cartitem.productId)
        {
            matchingItem = cartitem;
        }
    });

    if(matchingItem)
    {
        matchingItem.quantity += quantity;
    }
    else{
        cart.push({
            productId : productId,
            quantity : quantity,
            deliveryOptionId : '1'
        });
    }
    saveToStorage();
}

export function calcCartQuantity()
{
    let cartQuantity = 0;
    cart.forEach(cartItems => {
        cartQuantity += cartItems.quantity;
    });

    return cartQuantity;
}

function saveToStorage()
{
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCartQuantity(productId, newQuantity)
{
    let matchingProduct;
    cart.forEach((cartItems) => {
        if(productId === cartItems.productId)
        {
            matchingProduct = cartItems;
        }
    });
    matchingProduct.quantity = newQuantity;
    saveToStorage();
    document.querySelector(`.js-quantity-label[data-product-id = "${productId}"]`).innerHTML = `Quantity:${matchingProduct.quantity}`;

}

export function deleteFromCart(productId)
{
    let newCart = [];
    cart.forEach((cartItems) => {
        if(productId !== cartItems.productId)
        {
            newCart.push(cartItems);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId)
{
    let matchingProduct;

    cart.forEach((cartItems) => {
        if(productId === cartItems.productId)
        {
           matchingProduct = cartItems;
        }
    });

    matchingProduct.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}