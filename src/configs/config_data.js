module.exports = {
    TAG_MAP: {
        "NoninterestIncome": "Non-interest Income",
        "Revenues": "Revenues",
        "CostsAndExpenses": "Expenses",
        "UnusualOrInfrequentItemNetGainLoss": "Extraordinary Items",
        "DiscontinuedOperationIncomeLossFromDiscontinuedOperationBeforeIncomeTax": "Discontinued Operations",
        "SalesRevenueNet": "Sales (Net)",
        "CostOfGoodsAndServicesSold": "Cost of Goods Sold",
        "OperatingExpenses": "Operating Expenses",
        "GrossProfit": "Gross Profit",
        "ResearchAndDevelopmentExpense": "R&D Expense",
        "PaymentsOfDepartmentOfJusticeAndSecuritiesAndExchangeCommissionSettlementAndIndemnity": "SG&A Expense",
        "EarningBeforeInterestTaxesDepreciationAndAmortization": "EBITDA",
        "DepreciationAndAmortization": "Depreciation & Amortization",
        "NetInterestExpense": "Net Interest Expense",
        "IncomeLossFromContinuingOperationsNonoperatingIncomeLossBeforeIncomeTaxes": "Non-Operating Income (Loss)",
        "IncomeTaxes": "Income Taxes",
        "NetIncomeLoss": "Other Income (Loss)",
        "Minorityinterestinearningsofsubsidiary": "Minority Interest in Earnings",
        "PreferredDividendsDeclared": "Preferred Dividends",
        "NetIncomeAvailableToCommonStockholders": "Net Income (available to common)"
    },
    CALCULATED_FIELDS: {
        "Net Income": {
            "Revenues": 1,
            "CostsAndExpenses": -1,
            "NetInterestExpense": -1,
            "IncomeTaxes": -1
        }, // = Revenues - Expenses - Interests - Taxes
        "EBIT": {
            "Revenues": 1,
            "CostOfGoodsAndServicesSold": -1,
            "OperatingExpenses": -1
        }, // Earnings Before Interests and Taxes = Revenues - Cost of Goods Sold - Operating Expenses
        "EBT": {
            "NoninterestIncome": 1,
            "IncomeTaxes": 1
        }, // Earnings Before Taxes = Net Income + Taxes
        "Net Income Before Ext. Items": {
            "NoninterestIncome": 1,
            "UnusualOrInfrequentItemNetGainLoss": 1
        }, // = Net Income + Extraordinary Items
        "Ext. Items & Disc. Ops.": {
            "UnusualOrInfrequentItemNetGainLoss": 1,
            "DiscontinuedOperationIncomeLossFromDiscontinuedOperationBeforeIncomeTax": 1
        } // = Extraordinary Items + Discontinued Operations
    }
};
