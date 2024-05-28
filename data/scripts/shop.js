import { addToCart, calcCartQuantity } from "../cart.js";
import {products } from "../products.js";

document.querySelector('.js-cart-quantity').innerHTML = calcCartQuantity();

export function takeToCart()
{
    window.location.href = "../../cart.html";
}


renderProducts();



export function renderProducts()
{
    let productHTML ='';

    products.forEach((product) => {
        productHTML += `
        <div class="card">
            <div class="image-box">
                <img src="${product.image}" alt="" class="product-image">
            </div>
            <div class="content">
                <div class="product-name-css">${product.name}</div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>
                <div class="price-css ">₹ ${product.price}</div>
                <div class="product-quantity-container">
                    <select class="product-quantity js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>
                <div class="product-type">
                    <!--  -->
                </div>
                <div class="bottom-part">
                    <div class="invis js-added-to-cart-${product.id}">
                        <img src="images/icons/tick-icon.svg" alt="✅" class="tick-icon" >
                        Added
                    </div>
                    <div class="button-container">
                        <button class="add-to-cart-css js-add-to-cart" data-product-id = "${product.id}"> <img src="images/icons/add-shopping-cart.svg" alt="🛒"> Add</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    document.querySelector('.js-products-grid').innerHTML = productHTML;


    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;
            const selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`);

            const quantity = Number(selectedQuantity.value);

            addToCart(productId,quantity);

            document.querySelector('.js-cart-quantity').innerHTML = calcCartQuantity();

            const addMessage = document.querySelector(`.js-added-to-cart-${productId}`);
            addMessage.classList.add('visible');
            setTimeout(() => {
                addMessage.classList.remove('visible');
            },2000);

        });
    }); 
    
    
    document.querySelector('.js-cart-box').addEventListener('click', () => {
        takeToCart();
    });
}