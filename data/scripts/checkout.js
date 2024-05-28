import {calcCartQuantity} from '../cart.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

export function renderOty()
{
    const checkoutQuantityElem = document.querySelector('.js-checkout-quantity');

    if(calcCartQuantity() === 0)
    {
        checkoutQuantityElem.innerHTML = 'cart is empty';
    }
    else{
        checkoutQuantityElem.innerHTML = `${calcCartQuantity()} Items`;
    }
    return;
}

renderOty();

renderOrderSummary();
renderPaymentSummary();

