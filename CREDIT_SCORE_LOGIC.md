# Credit Score Calculation Logic

This document describes the logic used to calculate the credit score in the application, based on the various user inputs across all form sections.

---

## Overview

The credit score is computed by aggregating four main sub-scores:
- **Financial Score** (40%)
- **Credit History Score** (30%)
- **Business Stability Score** (20%)
- **Operational Score** (10%)

Each sub-score is calculated from user inputs in its respective form section. The final score is a weighted sum of these sub-scores, normalized to a 0-100 scale.

---

## 1. Financial Score
Derived from the user's financial data:
- **Inputs Used:**
  - Monthly Sales
  - Profit Margin (%)
  - Monthly EMI
  - Average Bank Balance

**Calculation Steps:**
- Start with a base score of 50.
- **Debt-to-Income Ratio:**
  - If `monthlySales > 0`, compute `debtRatio = (monthlyEMI / monthlySales) * 100`.
  - If `debtRatio <= 30`, add 20 points.
  - Else if `debtRatio <= 50`, add 10 points.
- **Profit Margin:** Add `profitMargin * 2` points (up to a max of 20).
- **Bank Balance:** Add `(averageBankBalance / 10,000)` points (up to a max of 10).
- Clamp the score between 0 and 100.

---

## 2. Credit History Score
Derived from the user's credit history:
- **Inputs Used:**
  - CIBIL Score (optional)
  - Number of Defaults
  - Banking Relationship (years)
  - Number of Returned Cheques

**Calculation Steps:**
- If CIBIL score is provided, base score is `((cibilScore - 300) / 5.5)`; otherwise, base score is 50.
- Subtract `defaults * 10` (up to 50 points).
- Subtract `returnedCheques * 5` (up to 20 points).
- Add `bankingRelationship * 2` (up to 20 points).
- Clamp the score between 0 and 100.

---

## 3. Business Stability Score
Derived from the user's business information:
- **Inputs Used:**
  - Years in Operation
  - Annual Revenue
  - Number of Employees

**Calculation Steps:**
- Start with a base score of 50.
- Add `yearsInOperation * 2` (up to 20 points).
- Add `(annualRevenue / 1,000,000)` (up to 20 points).
- Add `(employees / 5)` (up to 10 points).
- Clamp the score between 0 and 100.

---

## 4. Operational Score
Derived from operational metrics:
- **Inputs Used:**
  - Digital Payments (%)
  - Inventory Turnover Frequency
  - Seasonal Impact

**Calculation Steps:**
- Start with a base score of 50.
- Add `digitalPayments` (up to 20 points).
- **Inventory Turnover:**
  - Weekly: add 20
  - Monthly: add 10
  - Quarterly: subtract 10
  - Slower: subtract 20
- **Seasonal Impact:**
  - High: subtract 10
  - Medium: subtract 5
  - Low: add 5
  - None: add 10
- Clamp the score between 0 and 100.

---

## 5. Final Score Calculation

The final credit score is calculated as:

```
finalScore = (financialScore * 0.4)
           + (creditHistoryScore * 0.3)
           + (businessStabilityScore * 0.2)
           + (operationalScore * 0.1)
```

The final score is rounded and clamped between 0 and 100.

---

## Example

Suppose a user enters the following:
- Monthly Sales: 100,000
- Profit Margin: 10%
- Monthly EMI: 20,000
- Average Bank Balance: 50,000
- CIBIL Score: 700
- Defaults: 1
- Banking Relationship: 5 years
- Returned Cheques: 2
- Years in Operation: 10
- Annual Revenue: 2,000,000
- Employees: 20
- Digital Payments: 60%
- Inventory Turnover: Monthly
- Seasonal Impact: Low

Each sub-score is calculated as above, and the final score is computed using the weights.

---

## Notes
- All sub-scores are clamped to the range [0, 100].
- If a required input is missing, the score calculation will not proceed.
- The logic is designed to reward financial prudence, operational efficiency, business stability, and good credit history.

---

For further details, see the implementation in `src/context/CreditScoreContext.js`.
