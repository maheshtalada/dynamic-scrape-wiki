import { getPropertyExpenses } from 'utils/propertyUtil';
export default {
    "PROPERTY_PORTFOLIO_ROWS" : [
        {
           "key" : "grossRentRevenue",
           "label" : "GROSSRENTREVENUE"
        },
        {
           "key" : "otherIncome",
           "label" : "OTHER_INCOME"
        },
        {
           "key" : "totalIncome",
           "label" : "TOTALINCOME"
        },
        ...getPropertyExpenses(),
        {
           "key" : "totalExpenses",
           "label" : "TOTALEXPENSES"
        },
        {
           "key" : "netOperatingIncome",
           "label" : "NETOPERATINGINCOME"
        },
        {
           "key" : "emiCost",
           "label" : "DEBTSERVICES"
        },
        {
           "key" : "cashflowvalue",
           "label" : "ANNUALFREECASHFLOW"
        }
     ]
};
