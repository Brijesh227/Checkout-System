# Checkout System

This project implements a flexible and extensible checkout system for a store with customizable pricing rules.
---

## Features

- **Customizable Pricing Rules**:
  - Supports "3-for-2" offers.
  - Bulk discounts for items exceeding a specific quantity.
  - Easy to add new pricing rules using the `CartPricingRule` interface.

- **Extensibility**:
  - Designed to handle dynamic pricing rules for different products.
  - Supports multiple active rules at once.

## Folder Structure

```
checkout-system/
    src/
        interfaces/     # Interfaces for products and rules
        models/         # Core models like Checkout and Pricing Rules
        rules/          # Individual pricing rule implementations
        index.ts 
```
---


### Explanation of Commands:

- **`npm test`**: Runs all tests using Jest.
- **`npm run test -- tests/<file>`**: Runs a specific test file.
- **`npm run build && npm run start`**: Builds the TypeScript files and runs the application.
