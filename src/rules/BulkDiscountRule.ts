import { store } from '../data/ProductList';
import { BaseRule } from '../models/BaseRule';

export class BulkDiscountRule extends BaseRule {
  private discountApplicableCount: number;
  private discountedPrice: number;
  constructor(sku: string, discountApplicableCount: number, discountedPrice: number) {
    super(sku);
    this.discountApplicableCount = discountApplicableCount;
    this.discountedPrice = discountedPrice;
  }

  calculatePrice (cart: Map<string, number>) {
    const count = cart.get(this.sku) || 0;
    const product = store.find((item) => item.sku === this.sku);

    if (!product || count <= this.discountApplicableCount) return 0;

    cart.set(this.sku, 0);
    return count * this.discountedPrice;
  }
};
