/**
 * Challenge 2: E-Commerce Checkout System
 * -----------------------------------------
 * Calculates a customer's final invoice after applying a
 * category discount, an optional coupon discount, an optional
 * payment-method discount, and VAT.
 */

const VAT_RATE = 0.14; // 14% VAT

// Category -> discount rate
const CATEGORY_DISCOUNTS = {
  electronics: 0.10,
  clothing: 0.20,
  groceries: 0.05,
  books: 0.0,
};

// Valid coupon codes -> discount rate
const COUPONS = {
  SAVE10: 0.10,
  SAVE20: 0.20,
  WELCOME5: 0.05,
};

// Payment methods that receive an extra discount
const PAYMENT_METHOD_DISCOUNTS = {
  wallet: 0.05,
  card: 0.02,
  cash: 0.0,
};

function checkout({
  customerName,
  productCategory,
  productPrice,
  quantity,
  couponCode,
  paymentMethod,
}) {
  // 1. Subtotal
  const subtotal = productPrice * quantity;

  // 2. Category discount
  const categoryRate = CATEGORY_DISCOUNTS[productCategory.toLowerCase()] ?? 0;
  const categoryDiscount = subtotal * categoryRate;

  // 3. Coupon discount (only if valid)
  const couponRate = couponCode ? (COUPONS[couponCode.toUpperCase()] ?? 0) : 0;
  const isCouponValid = couponCode ? couponCode.toUpperCase() in COUPONS : false;
  const couponDiscount = subtotal * couponRate;

  // 4. Payment method discount
  const paymentRate = PAYMENT_METHOD_DISCOUNTS[paymentMethod.toLowerCase()] ?? 0;
  const paymentDiscount = subtotal * paymentRate;

  // 5. Total discount and price before tax
  const totalDiscount = categoryDiscount + couponDiscount + paymentDiscount;
  let priceBeforeTax = subtotal - totalDiscount;

  // Bonus: never go negative
  if (priceBeforeTax < 0) priceBeforeTax = 0;

  // 6. VAT
  const vatAmount = priceBeforeTax * VAT_RATE;
  const finalPrice = priceBeforeTax + vatAmount;

  // 7. Invoice
  console.log("========== INVOICE ==========");
  console.log(`Customer:         ${customerName}`);
  console.log(`Category:         ${productCategory}`);
  console.log(`Unit Price:       $${productPrice.toFixed(2)}`);
  console.log(`Quantity:         ${quantity}`);
  console.log(`Subtotal:         $${subtotal.toFixed(2)}`);
  console.log(`Category Discount:-$${categoryDiscount.toFixed(2)} (${categoryRate * 100}%)`);
  console.log(
    couponCode
      ? `Coupon (${couponCode}): ${isCouponValid ? `-$${couponDiscount.toFixed(2)} (${couponRate * 100}%)` : "Invalid coupon, no discount applied"}`
      : `Coupon:           None`
  );
  console.log(`Payment Discount: -$${paymentDiscount.toFixed(2)} (${paymentRate * 100}%, ${paymentMethod})`);
  console.log(`Price Before VAT: $${priceBeforeTax.toFixed(2)}`);
  console.log(`VAT (${(VAT_RATE * 100).toFixed(0)}%):       $${vatAmount.toFixed(2)}`);
  console.log(`------------------------------`);
  console.log(`FINAL TOTAL:      $${finalPrice.toFixed(2)}`);
  console.log("==============================\n");

  return finalPrice;
}

// ---------------------------------------------------------------------
// Test Scenarios
// ---------------------------------------------------------------------
console.log("=== Challenge 2: E-Commerce Checkout System ===\n");

// Normal case with valid coupon and wallet payment
checkout({
  customerName: "Amr Mohamed",
  productCategory: "Electronics",
  productPrice: 1000,
  quantity: 2,
  couponCode: "SAVE10",
  paymentMethod: "wallet",
});

// Invalid coupon code
checkout({
  customerName: "Sara Ali",
  productCategory: "Clothing",
  productPrice: 300,
  quantity: 1,
  couponCode: "NOTREAL",
  paymentMethod: "cash",
});

// No coupon at all
checkout({
  customerName: "Youssef Adel",
  productCategory: "Books",
  productPrice: 50,
  quantity: 3,
  couponCode: null,
  paymentMethod: "card",
});

// Bonus: heavy discounts driving price to (or below) zero
checkout({
  customerName: "Test Bonus Case",
  productCategory: "Clothing",
  productPrice: 10,
  quantity: 1,
  couponCode: "SAVE20",
  paymentMethod: "wallet",
});

module.exports = checkout;
