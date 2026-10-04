// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Sofia Garcia

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");

const book1 = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99
};

const book2 = {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 9.99
};

const book3 = {
    title: "1984",
    author: "George Orwell",
    price: 14.99
};

const TAX_RATE = 0.0825; // 8.25% sales tax
let isMember = true; // Change to false if the customer is not a member

console.log("--- Book Inventory ---");
console.log("Title: " + book1.title + ", Author: " + book1.author + ", Price: $" + book1.price);
console.log("Title: " + book2.title + ", Author: " + book2.author + ", Price: $" + book2.price);
console.log("Title: " + book3.title + ", Author: " + book3.author + ", Price: $" + book3.price);

// Subtotal and currency formatting functions
function calculateSubtotal(price, quantity) {
    return price * quantity
};
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

console.log("--- Function Declarations Test ---");
console.log("Subtotal for Book 1 (2 copies): " + formatCurrency(calculateSubtotal(book1.price, 2)));

// Arrow Functions
const calculatedTax = subtotal => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, isMember) => {
    return isMember ? subtotal * 0.9 : subtotal;
};

console.log(" --- Arrow Functions Test ---");
console.log("Tax on Book 2: " + formatCurrency(calculatedTax(book2.price)));
console.log("Member Discount on Book 2: " + formatCurrency(applyMemberDiscount(book2.price, isMember)));
console.log("Non-Member Discount on Book 2: " + formatCurrency(applyMemberDiscount(book2.price, false)));

// function expression with default parameters
function calculatedTotal(price, quantity = 1, isMember = false) {
    const subtotal = calculateSubtotal(price, quantity);
    const discountedSubtotal = applyMemberDiscount(subtotal, isMember);
    const tax = calculatedTax(discountedSubtotal);
    return discountedSubtotal + tax;
};

console.log(" --- Function Expression with Defaults ---");
console.log("Defaults: " + formatCurrency(calculatedTotal(book3.price)));
console.log("Default for isMember: " + formatCurrency(calculatedTotal(book3.price, 3)));
console.log("No Defaults: " + formatCurrency(calculatedTotal(book3.price, 3, isMember)));

// Rest Operator
function calculateBulkOrder(...prices) {
    let total = 0;
    for (const n of prices) {
        total += n;
    }
    return total;
};

console.log(" --- Rest Operator Test ---");
console.log("Bulk Order Total for three books: " + formatCurrency(calculateBulkOrder(book1.price, book2.price, book3.price)));
console.log("Bulk Order Total with 5 random values: " + formatCurrency(calculateBulkOrder(1, 2, 3, 4, 5)));

// callback function - flexible pricing
function processOrder(price, quantity, callback) {
    const total = callback(price, quantity);
    return "Book title: " + book1.title + ", Book Total: " + formatCurrency(total);
};

const standardPricing = (price, quantity) => price * quantity;
const memberPricing = (price, quantity) => price * quantity * 0.90; // 10% discount for members

console.log(" --- Callback Functions ---");
console.log("Standard Pricing- " + processOrder(book1.price, 1, standardPricing));
console.log("Member Pricing- " + processOrder(book1.price, 1, memberPricing));

//object methods with this

const orderSummary = {
    customerName: "Jane Doe",
    items: [],
    addItem(book, quantity) {
        this.items.push({ book: book, quantity: quantity });
    },
    getTotal() {
        let total = 0;
        for (const item of this.items) {
            total += item.book.price * item.quantity;
        }
        return total;
    },
    displaySummary() {
        let summary = "Customer: " + this.customerName + "\n";
        for (const item of this.items) {
            summary += "Book: " + item.book.title + ", Quantity: " + item.quantity + ", Price: " + formatCurrency(item.book.price) + "\n";
        }
        summary += "Total: " + formatCurrency(this.getTotal());
        return summary;
    }
};

console.log(" --- Object Methods ---");
orderSummary.addItem(book1, 2);
orderSummary.addItem(book2, 1);
console.log(orderSummary.displaySummary());

// Truthy/Falsy Validation
function validateDiscount(code) {
    if (code) {
        if (code.toUpperCase() == "MEMBER10") {
            return 0.10
        }
        if (code.toUpperCase() == "SAVE20") {
            return 0.20
        }
    }
    return 0;
}

console.log("--- Truthy/Falsy Validation ---");
console.log("MEMBER10 Discount: " + (validateDiscount("MEMBER10")));
console.log("SAVE20 Discount: " + (validateDiscount("SAVE20")));
console.log("Empty string: " + (validateDiscount("")));
console.log("Invalid Code Discount: " + (validateDiscount("INVALID")));

// 5.10 closure example
function createOrderProcessor(storeName){
    const storeTaxRate = 0.0825; // 8.25% sales tax

    function processStoreOrder(book, quantity){
        const subtotal = book.price * quantity;
        const total = subtotal + (subtotal * storeTaxRate);
        return "Store: " + storeName + ", Book: " + book.title + ", Quantity: " + quantity + ", Total: " + formatCurrency(total);
    }
    return processStoreOrder;
}

console.log("--- Nested Functions and Closures ---");
const storeProcessor = createOrderProcessor("Downtown Bookstore");
console.log(storeProcessor(book1, 1));
console.log(storeProcessor(book2, 2));
console.log(storeProcessor(book3, 3));
