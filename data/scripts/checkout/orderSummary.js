import { deliveryOptions , calcDeliveryDate, findDeliveryOption} from "../../deliveryOption.js";
import { cart , updateCartQuantity, deleteFromCart, updateDeliveryOption} from "../../cart.js";
import{ getProduct } from "../../products.js";
import { renderOty } from "../checkout.js";
import { renderPaymentSummary } from "./paymentSummary.js";



renderOrderSummary();

export function renderOrderSummary()
{
    let orderSummaryHTML = '';

    cart.forEach((cartItems) => {

        const productId = cartItems.productId;
        let matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItems.deliveryOptionId;

        let deliveryOption = findDeliveryOption(deliveryOptionId)

        const dateString = calcDeliveryDate(deliveryOption);

        orderSummaryHTML += `
        <div class="cart-card  cart-card-${productId}">
            <div class="delivery-date">
                Delivery Date: ${dateString}
            </div>
            <div class="container">
                <div class="items-details">
                    <div class="cart-product-image">
                        <img src="${matchingProduct.image}" alt="" class="product-image">
                    </div>
                    <div class="cart-product-details">
                        <div class="product-name-css limit-text-to-2-lines">${matchingProduct.name}</div>
                        <div class="price-css">₹ ${matchingProduct.price}</div>
                        <div class="cart-product-quantity-container">
                            <div class="item-quantity js-quantity-label" data-product-id="${matchingProduct.id}">Quantity:${cartItems.quantity}</div>
                            <div class="product-update-buttons">

                            <input type="text" class="mini-qty-box save-input update-save-link-invis"   data-product-id ="${matchingProduct.id}"> 
                            <span class="save-btn save-link update-save-link-invis" data-product-id ="${matchingProduct.id}">Save</span>

                            <button class="update-css update-link" data-product-id ="${matchingProduct.id}">Update</button>
                            <button class="update-css delete-link" data-product-id ="${matchingProduct.id}">Delete</button>

                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="message">Choose a delivery option:</div>
                        <div class="delivery-options">
                            
                            ${renderDeliveryOptions(matchingProduct,cartItems)}

                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });


    function renderDeliveryOptions(matchingProduct,cartItems)
    {
        let deliveryOptionHTML ='';

        deliveryOptions.forEach((deliveryOption) =>{

            const dateString = calcDeliveryDate(deliveryOption);

            const priceString = deliveryOption.price === 0 ? 'Free' : `₹ ${deliveryOption.price}`;

            const isChecked = deliveryOption.id === cartItems.deliveryOptionId;

            deliveryOptionHTML +=`
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" ${isChecked ? 'checked' : ''}>
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                </div>
            </div>
            `
        });
        

        return deliveryOptionHTML;
    }

    document.querySelector('.js-left-container').innerHTML = orderSummaryHTML;

    document.querySelectorAll('.update-link').forEach((button) =>{
        button.addEventListener('click', () =>{
            const {productId} = button.dataset;

            const upadte = document.querySelector(`.update-link[data-product-id ="${productId}"]`).classList.add('update-save-link-invis');
            const input = document.querySelector(`.save-input[data-product-id ="${productId}"]`).classList.add('update-save-link-visible');
            const save = document.querySelector(`.save-link[data-product-id ="${productId}"]`).classList.add('update-save-link-visible');
        });
        
    });


    document.querySelectorAll('.save-link').forEach((saveLink) => {

        saveLink.addEventListener('click', () => {

            const {productId} = saveLink.dataset;

            const newQuantityElement = document.querySelector(`.save-input[data-product-id="${productId}"]`);
        
            const newQuantity = !newQuantityElement.value.trim() ? alert("You didn't update quantity") : Number(newQuantityElement.value);

            console.log(newQuantity);
            if(newQuantity > 0 && newQuantity <= 1000)
            {
                updateCartQuantity(productId,newQuantity);
            }
            else if(newQuantity <= 0 && newQuantity > 1000)
            {
                alert(`You enter: ${newQuantity}. Which is not accepted.\n You can only enter 1 to 1000`);
            }

            document.querySelector(`.save-input[data-product-id ="${productId}"]`).classList.remove('update-save-link-visible');
            document.querySelector(`.save-link[data-product-id ="${productId}"]`).classList.remove('update-save-link-visible');
            document.querySelector(`.update-link[data-product-id ="${productId}"]`).classList.remove('update-save-link-invis');
            
            renderOty();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.delete-link').forEach((deleteLink) =>{
        deleteLink.addEventListener('click', () => {
            const {productId} = deleteLink.dataset;

            deleteFromCart(productId);
            
            const container = document.querySelector(`.cart-card-${productId}`);

            container.remove();

            renderOrderSummary();
            renderOty();
            renderPaymentSummary();
        });
    });


    document.querySelectorAll('.js-delivery-option').forEach((element) =>{
        element.addEventListener('click', () =>{
            const {productId, deliveryOptionId} = element.dataset;
            console.log('hi');
            updateDeliveryOption(productId, deliveryOptionId);
            console.log('hi');
            renderOrderSummary();
            renderPaymentSummary();
        });
    });


}