"use strict";

/**
 * Write subtotal(...prices) using a reduce callback.
 * Use rest parameters to accept any number of prices.
 */
const subtotal = (...prices) => prices.reduce((acc, curr) => acc + curr, 0);

/**
 * Write discountBy(rate) as a factory returning an arrow function.
 * This is a Higher-Order Function (HOF) that creates a closure over the rate.
 */
const discountBy = (rate) => (amount) => amount * (1 - rate);

/**
 * Add withVat as a small pure helper.
 * It should add 15% VAT to a given amount.
 */
const withVat = (n) => n * 1.15;

/**
 * Add toETB as a small pure helper.
 * It should format a number to 2 decimal places followed by " ETB".
 */
const toETB = (n) => n.toFixed(2);

/**
 * Build makeReceiptMaker() with a private order number.
 * This function uses a closure to maintain the state of orderNo across calls.
 * Inside, it should pre-build a 10% member discount function using discountBy(0.10).
 */
function makeReceiptMaker() {
  let sequence = 0;
  return function (prices, discountRate = 0) {
    sequence += 1;
    const base = subtotal(...prices);
    const discounted = discountBy(discountRate)(base);
    const finalAmount = toETB(withVat(discounted));
    return `#${sequence}: ${finalAmount} ETB`;
  };
}
