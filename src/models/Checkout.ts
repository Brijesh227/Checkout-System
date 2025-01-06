import { store } from '../data/ProductList';
import { Product } from '../interfaces/Product';
import { CartPricingRule } from './CartPricingRule';

export class Checkout {
  private cart: Map<string, number>;
  private cartPricingRule: CartPricingRule;
  public productList: Product[];
  private totalTillNow: number = 0;

  constructor(pricingRule: CartPricingRule) {
    this.cart = new Map();
    this.cartPricingRule = pricingRule;
    this.productList = store;
  }

  scan(sku: string): void {
    const count = this.cart.get(sku) || 0;
    this.cart.set(sku, count + 1);
    
    console.log("total till now", this.total());
  }

  total(): string {
    let finalPrice: number = 0;
    // const cartCopy = this.cart;
    const cartCopy = new Map(this.cart);
    
    finalPrice += this.cartPricingRule.applyRules(cartCopy);

    for (const [sku, count] of cartCopy) {
      const price = this.productList.find((item) => item.sku === sku)?.price || 0;
      if (price) {
        finalPrice += price * count;
      }
    }
    // console.log(`Total: $${finalPrice.toFixed(2)}`);
    return `$${finalPrice.toFixed(2)}`;
  }
}
