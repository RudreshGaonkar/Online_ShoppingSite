import { addToCart, calcCartQuantity } from "../cart.js";
import {featuredProducts } from "../products.js";

document.querySelector('.js-cart-quantity').innerHTML = calcCartQuantity();

document.querySelector('.js-cart-box').addEventListener('click', () => {
    window.location.href = "../../cart.html";
});

renderFeaturedProducts();


export function renderFeaturedProducts()
{
    let featuredProductHTML ='';

    featuredProducts.forEach((fproduct) => {
        featuredProductHTML += `
        <div class="card">
            <div class="image-box">
                <img src="${fproduct.image}" alt="" class="product-image">
            </div>
            <div class="content">
                <div class="product-name-css limit-text-to-2-lines">${fproduct.name}</div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${fproduct.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${fproduct.rating.count}
                    </div>
                </div>
                <div class="price-css">₹ ${fproduct.price}</div>
                <div class="product-quantity-container">
                    <select class="product-quantity js-quantity-selector-${fproduct.id}">
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
                    ${fproduct.extraInfoHTML()}
                </div>
                <div class="bottom-part">
                    <div class="invis  js-added-to-cart-${fproduct.id}">
                        <img src="images/icons/tick-icon.svg" alt="✅" class="tick-icon" >
                        Added
                    </div>
                    <div class="button-container">
                        <button class="add-to-cart-css js-add-to-cart" data-product-id = "${fproduct.id}"> <img src="images/icons/add-shopping-cart.svg" alt="🛒"> Add</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    document.querySelector('.js-featured-products').innerHTML = featuredProductHTML;

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
    

}




