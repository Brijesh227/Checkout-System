export interface PriceRule {
  calculatePrice(cart: Map<string, number>): number;
}
