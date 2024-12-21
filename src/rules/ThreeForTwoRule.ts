import { store } from '../data/ProductList';
import { BaseRule } from '../models/BaseRule';

export class ThreeForTwoRule extends BaseRule {
  constructor(sku: string) {
    super(sku);
  }

  calculatePrice (cart: Map<string, number>) {
    const count = cart.get(this.sku) || 0;
    const product = store.find((item) => item.sku === this.sku);

    if (!product || count < 3) return 0;

    const eligibleProductset = Math.floor(count / 3);
    cart.set(this.sku, count % 3); 

    return eligibleProductset * 2 * product.price;
  }
};
