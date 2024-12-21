import { Checkout } from '../src/models/Checkout';
import { CartPricingRule } from '../src/models/CartPricingRule';
import { ThreeForTwoRule } from '../src/rules/ThreeForTwoRule';
import { BulkDiscountRule } from '../src/rules/BulkDiscountRule';

describe('Checkout System', () => {
  let cartPricingRule: CartPricingRule;

  beforeEach(() => {
    cartPricingRule = new CartPricingRule([
      new ThreeForTwoRule('atv'),
      new BulkDiscountRule('ipd', 4, 499.99)
    ]);
  });

  it('calculates total with no items scanned', () => {
    const co = new Checkout(cartPricingRule);
    expect(co.total()).toBe('$0.00');
  });

  it('calculates total with 3 for 2 deal on Apple TV', () => {
    const co = new Checkout(cartPricingRule);
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');
    expect(co.total()).toBe('$249.00');
  });

  it('calculates total with bulk discount on Super iPad', () => {
    const co = new Checkout(cartPricingRule);
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    expect(co.total()).toBe('$2499.95');
  });

  it('applies no discount when rules are not met', () => {
    const co = new Checkout(cartPricingRule);
    co.scan('ipd');
    co.scan('vga');
    expect(co.total()).toBe('$579.99');
  });

  it('handles empty pricing rules gracefully', () => {
    const emptyPricingRule = new CartPricingRule([]);
    const co = new Checkout(emptyPricingRule);
    co.scan('atv');
    co.scan('ipd');
    expect(co.total()).toBe('$659.49'); 
  });

  it('calculates total with multiple pricing rules applied simultaneously', () => {
    const customPricingRule = new CartPricingRule([
      new ThreeForTwoRule('atv'),
      new ThreeForTwoRule('vga'),
      new BulkDiscountRule('ipd', 4, 499.99)
    ]);
    const co = new Checkout(customPricingRule);
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');
    co.scan('vga');
    co.scan('vga');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    expect(co.total()).toBe('$2778.95');
  });

  it('handles unknown or invalid SKU gracefully', () => {
    const co = new Checkout(cartPricingRule);
    co.scan('xyz'); 
    co.scan('ipd');
    co.scan('vga');
    expect(co.total()).toBe('$579.99');
  });

  it('handles scanning the same item multiple times dynamically', () => {
    const co = new Checkout(cartPricingRule);
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd'); 
    expect(co.total()).toBe('$2609.45');
  });

  it('calculates total with no applicable rules', () => {
    const customPricingRule = new CartPricingRule([
      new ThreeForTwoRule('vga')
    ]);
    const co = new Checkout(customPricingRule);
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    expect(co.total()).toBe('$1209.48');
  });

  it('ensures order of scanning does not affect total', () => {
    const co1 = new Checkout(cartPricingRule);
    co1.scan('atv');
    co1.scan('ipd');
    co1.scan('vga');
    co1.scan('atv');
    co1.scan('ipd');
    co1.scan('atv');

    const co2 = new Checkout(cartPricingRule);
    co2.scan('ipd');
    co2.scan('ipd');
    co2.scan('atv');
    co2.scan('vga');
    co2.scan('atv');
    co2.scan('atv');

    expect(co1.total()).toBe(co2.total());
  });
});
