import { Checkout } from "./models/Checkout";
import { CartPricingRule } from "./models/CartPricingRule";
import { ThreeForTwoRule } from "./rules/ThreeForTwoRule";
import { BulkDiscountRule } from "./rules/BulkDiscountRule";

const pricingRules = new CartPricingRule([
  new ThreeForTwoRule('atv'),
  new BulkDiscountRule('ipd', 4, 499.99),
]);

const co = new Checkout(pricingRules);
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('ipd');

co.total();