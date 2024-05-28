import { cart , calcCartQuantity} from "../../cart.js";
import { getProduct } from "../../products.js";
import { findDeliveryOption } from "../../deliveryOption.js";

export function renderPaymentSummary()
{
    let productPrice = 0;
    let shippingPrice = 0;

    let paymentSummaryHTML ='';

    cart.forEach((cartitem) => {
        const product = getProduct(cartitem.productId);
        productPrice += product.price * cartitem.quantity
        
        const deliveryOption = findDeliveryOption(cartitem.deliveryOptionId)
        shippingPrice += deliveryOption.price;
    });

    const totalBeforeTax = productPrice + shippingPrice;
    const tax = Math.round(totalBeforeTax * 0.18); //0.18 = 18%
    const grandTotal = totalBeforeTax + tax;

    paymentSummaryHTML = `
        <div class="message">Order Summary</div>
        <div class="payment-summary-container">
            <div class="num1">Items (${calcCartQuantity()}):</div>
            <div class="num2">₹${productPrice}</div>
            <div class="num3">Shipping & handling:</div>
            <div class="num4">₹${shippingPrice}</div>
            <div class="num5">Total before tax:</div>
            <div class="num6">₹${totalBeforeTax}</div>
            <div class="num7">Estimated tax (18%):</div>
            <div class="num8">₹${tax}</div>
        </div>
        <div class="total-summary">
            <div class="message">Order Total</div>
            <div>₹${grandTotal}</div>
        </div>
        <div class="order-button-container">
            <button class="place-order-button">Place your order</button>
        </div>
    `;

    document.querySelector('.js-right-side').innerHTML = paymentSummaryHTML;
}