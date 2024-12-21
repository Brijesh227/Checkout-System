import { PriceRule } from "../interfaces/PriceRule";

export class CartPricingRule {
    private ruleList: PriceRule[];
    constructor(priceRuleList: PriceRule[]) {
        this.ruleList = priceRuleList;
    }

    applyRules(cart: Map<string, number>): number {
        let calculatedPrice: number = 0;
        for (const rule of this.ruleList) {
            calculatedPrice += rule.calculatePrice(cart);
        }
        return calculatedPrice;
    }
}
