import { PriceRule } from '../interfaces/PriceRule';

export abstract class BaseRule implements PriceRule {
  protected sku: string;

  constructor(sku: string) {
    this.sku = sku;
  }

  abstract calculatePrice(cart: Map<string, number>): number;
}
