// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia


// --- Order State ---
let discountRate = 0;

const productPrices = {
    "laptop": 999.99,
    "tablet": 499.99,
    "phone": 699.99,
    "monitor": 299.99
};

const discountCodes = {
    "SAVE10": 0.1,
    "SAVE20": 0.2,
    "STUDENT": 0.15
};

const calculateTax = subtotal => subtotal * 0.0825;

const applyDiscount = function (subtotal, discountCode) {
    const code = discountCode.trim().toUpperCase();
    if (code === "") {
        discountRate = 0;
    }else if (code === "SAVE10") {
        discountRate = discountCodes["SAVE10"];
    } else if (code === "SAVE20") {
        discountRate = discountCodes["SAVE20"];
    } else if (code === "STUDENT") {
        discountRate = discountCodes["STUDENT"];
    }else {
        discountRate = 0;
    }
    return subtotal * discountRate;
};



const orderForm = document.querySelector('#orderForm');
const product = document.querySelector('#product');
const quantityInput = document.querySelector('#quantity');
const discountCode = document.querySelector('#discountCode');
const resultContainer = document.querySelector('#results');
const resProduct = document.querySelector('#res-product');
const resQuantity = document.querySelector('#res-quantity');
const resSubtotal = document.querySelector('#res-subtotal');
const resDiscount = document.querySelector('#res-discount');
const resTax = document.querySelector('#res-tax');
const resTotal = document.querySelector('#res-total');

orderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const selectedProduct = product.value;
    const quantity = Number(quantityInput.value);
    const code = discountCode.value.trim();
    const price = productPrices[selectedProduct];

    if(price === undefined) {
        alert('Please select a valid product.');
        return;
    }
    if(quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }


const subtotal = price * quantity;
const discountAmount = applyDiscount(subtotal, code);
const discountSubtotal = subtotal - discountAmount;
const tax = calculateTax(discountSubtotal);
const total = discountSubtotal + tax;

resProduct.textContent ="Product: " + product.options[product.selectedIndex].text;
resQuantity.textContent = "Quantity: " + quantity;
resSubtotal.textContent = "Subtotal: $" + subtotal.toFixed(2);
resDiscount.textContent = "Discount: -$" + discountAmount.toFixed(2);
resTax.textContent = "Tax: $" + tax.toFixed(2);
resTotal.textContent = "Total: $" + total.toFixed(2);
resultContainer.classList.remove('results-hidden');
});
