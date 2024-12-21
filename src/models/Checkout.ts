import { store } from '../data/ProductList';
import { Product } from '../interfaces/Product';
import { CartPricingRule } from './CartPricingRule';

export class Checkout {
  private cart: Map<string, number>;
  private cartPricingRule: CartPricingRule;
  public productList: Product[];

  constructor(pricingRule: CartPricingRule) {
    this.cart = new Map();
    this.cartPricingRule = pricingRule;
    this.productList = store;
  }

  scan(sku: string): void {
    const count = this.cart.get(sku) || 0;
    this.cart.set(sku, count + 1);
  }

  total(): string {
    let finalPrice: number = 0;
    finalPrice += this.cartPricingRule.applyRules(this.cart);

    for (const [sku, count] of this.cart) {
      const price = this.productList.find((item) => item.sku === sku)?.price || 0;
      if (price) {
        finalPrice += price * count;
      }
    }
    console.log(`Total: $${finalPrice.toFixed(2)}`);
    return `$${finalPrice.toFixed(2)}`;
  }
}
