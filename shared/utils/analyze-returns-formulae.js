//the YEARS_TO_CLOSE will change in future to a dynamic value depending on the number of years we calculate the IRR for.
const YEARS_TO_CLOSE = 10;
//Data used for IRR calculation
const MAX_ITER = 20;
const EXCEL_EPSILON = 0.0000001;
const PROPERTY_MANAGEMENT_COST_PERCENTAGE = 8;
const DEFAULT_RENT_INCREMENT = 1;
const DEFAULT_APPRECIATION = 2;
const DEFAULT_LOAN_DURATION = 30;
const DEFAULT_LOAN_INTEREST_RATE = 5;
const EXPENSE_RENT_RATIO_THRESHOLD = 0.3;
const EXPENSE_RENT_RATIO_DECREMENT_FACTOR = 0.0033;
const MAINTAINENCE_RENT_FACTOR = 0.10;

export const formulas = {
	caprate({ cherrypickids, getDataByID, cloneKey = '' }) {
		const netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
			loanDuration = Number(cherrypickids['loanDuration'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanDuration'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost,
			initialInvestmentWithoutMortgage = salePrice+initialImprovementCost;
		// downPaymentPercentage is  100%
		// then calculate for caprate without mortgage
		// downPaymentPercentage < 100
		// then calculate for caprate with mortgage

		if(downPaymentPercentage === 100) {
			if(netOperatingIncome && initialInvestmentWithoutMortgage) {
				return conditionalDecimalConvert( (netOperatingIncome * 100) / initialInvestmentWithoutMortgage);
			}
		}

		if(downPaymentPercentage && downPaymentPercentage < 100) {
			if(!loanInterestRate || !loanDuration) {
				return '';
			}
			const downPaymentCost = salePrice * (downPaymentPercentage/100);
			if(annualFreeCashFlow && (downPaymentCost || initialImprovementCost)) {
				return conditionalDecimalConvert((annualFreeCashFlow/(downPaymentCost+initialImprovementCost)) * 100);
			}
		}
		return '';
	},

	cashOnCashReturnPercentage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost,
		 downPaymentCost = salePrice * (downPaymentPercentage/100);
		if(annualFreeCashFlow && (downPaymentCost || initialImprovementCost)) {
			return conditionalDecimalConvert((annualFreeCashFlow/(downPaymentCost+initialImprovementCost)) * 100);
		}
		return '';
	},

	netOperatingIncome({ cherrypickids, getDataByID, cloneKey = '' }) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			totalExpenses = Number(cherrypickids['totalExpenses'] && getDataByID(cherryPickIdGenerator(cherrypickids['totalExpenses'], cloneKey)) || '');
		if(grossRentRevenue ) {
			return conditionalDecimalConvert( grossRentRevenue - totalExpenses,0)
		}
		return 0;

	},

	allExpensesNetOperatingIncome({ cherrypickids, getDataByID, cloneKey = '' }) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			totalExpenses = this.totalExpenses({ cherrypickids, getDataByID, cloneKey});
		if(grossRentRevenue ) {
			return conditionalDecimalConvert( grossRentRevenue - totalExpenses,0);
		}
		return 0;

	},

	totalExpenses({ cherrypickids, getDataByID, cloneKey = '' }) {
		const propertyInsurance = Number(cherrypickids['propertyInsurance'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyInsurance'], cloneKey)) || ''),
			propertyTaxes = Number(cherrypickids['propertyTaxes'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyTaxes'], cloneKey)) || ''),
			ownerAssociationFee = Number(cherrypickids['ownerAssociationFee'] && getDataByID(cherryPickIdGenerator(cherrypickids['ownerAssociationFee'], cloneKey)) || ''),
			vacancyLosses = Number(cherrypickids['vacancyLosses'] && getDataByID(cherryPickIdGenerator(cherrypickids['vacancyLosses'], cloneKey)) || ''),
			managementFees = Number(cherrypickids['managementFees'] && getDataByID(cherryPickIdGenerator(cherrypickids['managementFees'], cloneKey)) || ''),
			leasingFees = Number(cherrypickids['leasingFees'] && getDataByID(cherryPickIdGenerator(cherrypickids['leasingFees'], cloneKey)) || ''),
			propertyMaintenance = Number(cherrypickids['propertyMaintenance'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyMaintenance'], cloneKey)) || '');
		return (propertyInsurance+propertyTaxes+ownerAssociationFee+vacancyLosses+managementFees+leasingFees+propertyMaintenance);
	},

	initialInvestment({ cherrypickids, getDataByID, cloneKey = ''}) {
		const downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost;
		return conditionalDecimalConvert((salePrice * (downPaymentPercentage/100))+initialImprovementCost);
	},

	initialInvestmentWithoutMortgage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost;
		return conditionalDecimalConvert(salePrice+initialImprovementCost);
	},

	annualFreeCashFlow({ cherrypickids, getDataByID, cloneKey = ''}) {
		const netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
			emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || '');
		return conditionalDecimalConvert(netOperatingIncome - emiCost,0);
	},

	initialInvestmentWithMortgage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost;
		return conditionalDecimalConvert((salePrice * (downPaymentPercentage/100))+initialImprovementCost);
	},

	downPaymentPercentage({ cherrypickids, getDataByID, cloneKey = '', data, storeValue}) {
		const downPaymentCost = Number(cherrypickids['downPaymentCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentCost'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || '');
		let percentage = '';

		if(downPaymentCost && salePrice) {
			percentage = conditionalDecimalConvert(((downPaymentCost/salePrice) * 100));
			if( percentage >= 100) {
				percentage = 100;
			}
		} else if (salePrice) {
			percentage = 100;
		}

		return percentage;
	},

	downPaymentCost({ cherrypickids, getDataByID, cloneKey = ''}) {
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
		let calculatedDownPayment= '';
		if(salePrice && downPaymentPercentage) {
			if(downPaymentPercentage === 100) {
				return salePrice;
			} else {
				calculatedDownPayment =  conditionalDecimalConvert(salePrice * (downPaymentPercentage/100));
			}
		}
		if(Number(calculatedDownPayment) >=  salePrice) {
			return salePrice;
		} else {
			return calculatedDownPayment;
		}
	},

	emiCost({ cherrypickids, getDataByID, cloneKey = ''}) {
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
			purchaseType = cherrypickids['purchaseType'] && getDataByID(cherryPickIdGenerator(cherrypickids['purchaseType'], cloneKey)) || '',
			loanDuration = cherrypickids['loanDuration'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanDuration'], cloneKey)) || '',
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
		if(downPaymentPercentage === 100 || !loanDuration || !loanInterestRate) {
			return 0;
		}
		const principalAmount = salePrice - (salePrice * (downPaymentPercentage / 100));
		const interestRatePerMonth = (loanInterestRate / (12 * 100));
		const emi = principalAmount ? ((principalAmount * interestRatePerMonth * Math.pow((1 + interestRatePerMonth),(loanDuration * 12))) /  (Math.pow((1 + interestRatePerMonth),(loanDuration * 12)) - 1)) : 0;
		return conditionalDecimalConvert(emi * 12,0);
	},

	calculateIRR({ cherrypickids, getDataByID, cloneKey = ''},yearsToClose=10) {
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || ''),
			rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || ''),
			netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
			annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || ''),
			loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
			grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			initialInvestment = this.initialInvestment({ cherrypickids, getDataByID}),
			cashFlowByDownPayment =  downPaymentPercentage === 100 ? netOperatingIncome : annualFreeCashFlow,
			netProceedsFromSale = getNetProceedsFromSale(salePrice,emiCost,yearsToClose,propertyAnnualAppreciationPercentage,downPaymentPercentage,loanInterestRate),
			//cumulativeAppreciation = getCumulativeAppreciation(salePrice,emiCost,yearsToClose,propertyAnnualAppreciationPercentage,downPaymentPercentage,loanInterestRate),
			cashFlows = getCashFlows(yearsToClose,initialInvestment,cashFlowByDownPayment,netProceedsFromSale,rentIncrementPercentage,grossRentRevenue,emiCost,cherrypickids, getDataByID, cloneKey);
		return conditionalDecimalConvert(calculateIRRPercent(cashFlows));
	},

	internalRateOfReturn(props,yearsToClose=YEARS_TO_CLOSE) {
		return this.calculateIRR(props,yearsToClose);
	},


	internalRateOfReturnSplitted({ cherrypickids, getDataByID, cloneKey = ''},yearsToClose=YEARS_TO_CLOSE) {
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || DEFAULT_APPRECIATION),
			rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || DEFAULT_RENT_INCREMENT),
			netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
			annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			emiCost = (Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || ''))/12,
			loanInterestRate = Number(cherrypickids['loanInterestRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['loanInterestRate'], cloneKey)) || ''),
			grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			principalAmount = salePrice - (salePrice*(downPaymentPercentage/100)),
			cashFlowByDownPayment =  downPaymentPercentage === 100 ? netOperatingIncome : annualFreeCashFlow,
			cumulativeAppreciation = getCumulativeAppreciation(salePrice,yearsToClose,propertyAnnualAppreciationPercentage),
			cumulativeCashFlow = getCumulativeCashFlow(grossRentRevenue, yearsToClose,cashFlowByDownPayment,rentIncrementPercentage,emiCost*12,cherrypickids,getDataByID,cloneKey),
			principalPaidAmount = getPaidPrincipalAmount(principalAmount,emiCost,loanInterestRate,yearsToClose),
			rentIncrement = getCumulativeRent(grossRentRevenue,rentIncrementPercentage,yearsToClose),
			cashFlowGrowth = getCashFlowGrowth(grossRentRevenue, yearsToClose,cashFlowByDownPayment,rentIncrementPercentage,emiCost*12,cherrypickids,getDataByID,cloneKey);
		return {
			cumulativeAppreciation,
			cumulativeCashFlow,
			principalPaidAmount,
			rentIncrement,
			cashFlowGrowth
		};
	},

	vacancyLosses({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
		if(grossRentRevenue) {
			return conditionalDecimalConvert(grossRentRevenue/24,0);
		}
		return '';
	},

	vacancyLossesPercentage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
		const vacancyLosses = this.vacancyLosses({cherrypickids, getDataByID, cloneKey});
		let percentage = 0;

		if(vacancyLosses && grossRentRevenue) {
			percentage = conditionalDecimalConvert(((vacancyLosses/grossRentRevenue) * 100),1);
		}
		if(percentage < 0) {
			return ''
		}

		return percentage;
	},

	propertyTaxes({ cherrypickids, getDataByID, cloneKey = ''}) {
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			propertyTaxRate = Number(cherrypickids['propertyTaxRate'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyTaxRate'], cloneKey)) || '');
		if(salePrice && propertyTaxRate) {
			return conditionalDecimalConvert((salePrice * (propertyTaxRate/100)),0);
		}
		return '';
	},

	managementAndLeasingFees({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),

			propertyManagementCost = grossRentRevenue * (PROPERTY_MANAGEMENT_COST_PERCENTAGE/100),
			leasingFees = grossRentRevenue/48;
		return conditionalDecimalConvert(propertyManagementCost+leasingFees, 1);
	},

	managementFee({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),

			propertyManagementCost = ((grossRentRevenue*11.5)/12) * (PROPERTY_MANAGEMENT_COST_PERCENTAGE/100);
		return conditionalDecimalConvert(propertyManagementCost,0);
	},

	managementFeePercentage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
		const managementFee = this.managementFee({cherrypickids, getDataByID, cloneKey});
		let percentage = 0;

		if(managementFee && grossRentRevenue) {
			percentage = conditionalDecimalConvert(((managementFee/grossRentRevenue) * 100),1);
		}
		if(percentage < 0) {
			return ''
		}

		return percentage;
	},

	leasingFee({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			leasingFees = grossRentRevenue/((12*2*100)/(50));
		return conditionalDecimalConvert(leasingFees,0);
	},

	leasingFeePercentage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
		const leasingFee = this.leasingFee({cherrypickids, getDataByID, cloneKey});
		let percentage = 0;

		if(leasingFee && grossRentRevenue) {
			percentage = conditionalDecimalConvert(((leasingFee/grossRentRevenue) * 100),1);
		}
		if(percentage < 0) {
			return ''
		}

		return percentage;
	},

	maintenanceFee({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			maintenanceFee = grossRentRevenue*MAINTAINENCE_RENT_FACTOR;
		return conditionalDecimalConvert(maintenanceFee,0);
	},

	maintenanceFeePercentage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
		const maintenanceFee = this.maintenanceFee({cherrypickids, getDataByID, cloneKey});
		let percentage = 0;

		if(maintenanceFee && grossRentRevenue) {
			percentage = conditionalDecimalConvert(((maintenanceFee/grossRentRevenue) * 100),1);
		}
		if(percentage < 0) {
			return ''
		}

		return percentage;
	},

	expenseCost({ cherrypickids, getDataByID, cloneKey = ''}) {
		const expenseFactor = Number(cherrypickids['expenseFactor'] && getDataByID(cherryPickIdGenerator(cherrypickids['expenseFactor'], cloneKey)) || '');
		const expensePercentage = Number(cherrypickids['expensePercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['expensePercentage'], cloneKey)) || '');
		const salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
		let calculatedExpense= '';
		if(expenseFactor && expensePercentage) {
			calculatedExpense =  conditionalDecimalConvert(expenseFactor * (expensePercentage/100),0);
		}
		return calculatedExpense;
	},

	expensePercentage({ cherrypickids, getDataByID, cloneKey = ''}) {
		const expenseFactor = Number(cherrypickids['expenseFactor'] && getDataByID(cherryPickIdGenerator(cherrypickids['expenseFactor'], cloneKey)) || '');
		const expenseCost = Number(cherrypickids['expenseCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['expenseCost'], cloneKey)) || '');
		let percentage = 0;

		if(expenseCost && expenseFactor) {
			percentage = conditionalDecimalConvert(((expenseCost/expenseFactor) * 100),1);
		}
		if(percentage < 0) {
			return ''
		}

		return percentage;

	},

	capRateGrowth({cherrypickids, getDataByID, cloneKey = ''},yearsToClose) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || ''),
			netOperatingIncome = Number(cherrypickids['netOperatingIncome'] && getDataByID(cherryPickIdGenerator(cherrypickids['netOperatingIncome'], cloneKey)) || ''),
			emiCost = (Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || ''))/12,
			annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost,
			downPaymentCost = salePrice * (downPaymentPercentage/100),
			projectedCashFlow = getCashFlowGrowth(grossRentRevenue, yearsToClose,annualFreeCashFlow,rentIncrementPercentage,emiCost*12,cherrypickids,getDataByID,cloneKey),
			totalInvestment = downPaymentCost + initialImprovementCost;
		if(projectedCashFlow && totalInvestment) {
			// console.log(projectedCashFlow,totalInvestment);
			return conditionalDecimalConvert((projectedCashFlow/totalInvestment)*100,2);
		}
		return '';
	},

	cashOnCashReturnGrowth({cherrypickids, getDataByID, cloneKey = ''},yearsToClose) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
			rentIncrementPercentage = Number(cherrypickids['rentIncrementPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['rentIncrementPercentage'], cloneKey)) || ''),
			salePrice = Number(cherrypickids['salePrice'] && getDataByID(cherryPickIdGenerator(cherrypickids['salePrice'], cloneKey)) || ''),
			propertyAnnualAppreciationPercentage = Number(cherrypickids['propertyAnnualAppreciationPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['propertyAnnualAppreciationPercentage'], cloneKey)) || ''),
			improvementCost = Number(cherrypickids['initialImprovementCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['initialImprovementCost'], cloneKey)) || ''),
			closingCost = Number(cherrypickids['closingCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['closingCost'], cloneKey)) || ''),
			initialImprovementCost = improvementCost + closingCost,
			annualFreeCashFlow = Number(cherrypickids['annualFreeCashFlow'] && getDataByID(cherryPickIdGenerator(cherrypickids['annualFreeCashFlow'], cloneKey)) || ''),
			downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || ''),
			emiCost = Number(cherrypickids['emiCost'] && getDataByID(cherryPickIdGenerator(cherrypickids['emiCost'], cloneKey)) || '')/12,
			downPaymentCost = salePrice * (downPaymentPercentage/100),

			projectedCashFlow = getCashFlowGrowth(grossRentRevenue,yearsToClose,annualFreeCashFlow,rentIncrementPercentage,emiCost*12,cherrypickids,getDataByID,cloneKey),
			totalInvestment = downPaymentCost + initialImprovementCost;
		if(projectedCashFlow && totalInvestment) {
			return conditionalDecimalConvert((projectedCashFlow/totalInvestment)*100,2);
		}
		return '';
	},

	grossRentRevenue({cherrypickids, getDataByID, cloneKey = ''}) {
		const monthlyRent = Number(cherrypickids['monthlyRent'] && getDataByID(cherryPickIdGenerator(cherrypickids['monthlyRent'], cloneKey)) || '');
		if(monthlyRent ) {
			return conditionalDecimalConvert( monthlyRent*12,0)
		}
		return '';
	},

	monthlyRent({cherrypickids, getDataByID, cloneKey = ''}) {
		const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || '');
		if(grossRentRevenue ) {
			return conditionalDecimalConvert( grossRentRevenue/12,0)
		}
		return '';
	},

	updateLoanTenure({cherrypickids, getDataByID, cloneKey = '', data}) {
		const downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
		if(Number(downPaymentPercentage) < 100) {
			return data.value || DEFAULT_LOAN_DURATION
		}
		return '';
	},

	updateLoanInterestRate({cherrypickids, getDataByID, cloneKey = '', data}) {
		const downPaymentPercentage = Number(cherrypickids['downPaymentPercentage'] && getDataByID(cherryPickIdGenerator(cherrypickids['downPaymentPercentage'], cloneKey)) || '');
		if(Number(downPaymentPercentage) < 100) {
			return data.value  || DEFAULT_LOAN_INTEREST_RATE
		}
		return '';
	}
};

function calculateIRRPercent(cashFlows) {
	let x = 0.1;
	let iter = 0;
	while (iter++ < MAX_ITER) {
		const x1 = 1.0 + x;
		let fx = 0.0;
		let dfx = 0.0;
		for (let i = 0; i < cashFlows.length; i++) {
			const v = cashFlows[i];
			const x1_i = Math.pow( x1, i );
			fx += (v / x1_i);
			const x1_i1 = x1_i * x1;
			dfx += ((-i * v) / x1_i1);
		}
		const new_x = x - (fx / dfx);
		const epsilon = Math.abs( new_x - x );
		if (epsilon <= EXCEL_EPSILON) {
			if (x == 0.0 && Math.abs( new_x ) <= EXCEL_EPSILON) {
				return 0.0;
			}
			else {
				return new_x*100;
			}
		}
		x = new_x;
	}
	return x;
}

function getCumulativeAppreciation(salePrice,
								   yearsToClose,
								   propertyAnnualAppreciationPercentage) {
	let appreciation = 0;
	let cumAppreciation = 0;
	let futureSalePrice = salePrice;
	for(let i = 1; i <= yearsToClose; i++) {
		appreciation = futureSalePrice*(propertyAnnualAppreciationPercentage/100);
		futureSalePrice += appreciation;
		cumAppreciation += appreciation;
	}
	return cumAppreciation;
}

function getCumulativeRent(grossRentRevenue,rentIncrementPercentage,yearsToClose) {
	return grossRentRevenue * Math.pow(1+(rentIncrementPercentage/100), yearsToClose-1);
}

function getCashFlowGrowth(grossRentRevenue, yearsToClose, cashFlow, rentIncrementPercentage,debtService,cherrypickids,getDataByID,cloneKey) {
	let projectedCashFlow = cashFlow,
		incrementedTotalExpenses = getTotalExpenses(cherrypickids,getDataByID,cloneKey);
	let expenseRentRatio = getExpenseRentRatio(cherrypickids,getDataByID,cloneKey);
	for(let i = 2; i <= yearsToClose; i++) {
		grossRentRevenue = grossRentRevenue * (1+(rentIncrementPercentage/100));
		if(expenseRentRatio > EXPENSE_RENT_RATIO_THRESHOLD) {
			expenseRentRatio = expenseRentRatio - EXPENSE_RENT_RATIO_DECREMENT_FACTOR;
		}
		incrementedTotalExpenses = grossRentRevenue*expenseRentRatio;
		projectedCashFlow = ((grossRentRevenue-incrementedTotalExpenses)-debtService);
	}
	return projectedCashFlow;
}

function getCumulativeCashFlow(grossRentRevenue, yearsToClose, cashFlow, rentIncrementPercentage,debtService,cherrypickids,getDataByID,cloneKey) {
	let projectedCashFlow = cashFlow,
		incrementedTotalExpenses = getTotalExpenses(cherrypickids,getDataByID,cloneKey);
	let expenseRentRatio = getExpenseRentRatio(cherrypickids,getDataByID,cloneKey);
	for(let i = 2; i <= yearsToClose; i++) {
		grossRentRevenue = grossRentRevenue * (1+(rentIncrementPercentage/100));
		if(expenseRentRatio > EXPENSE_RENT_RATIO_THRESHOLD) {
			expenseRentRatio = expenseRentRatio - EXPENSE_RENT_RATIO_DECREMENT_FACTOR;
		}
		incrementedTotalExpenses = grossRentRevenue*expenseRentRatio;
		projectedCashFlow += ((grossRentRevenue-incrementedTotalExpenses)-debtService);
	}
	return projectedCashFlow;
}

function getExpenseRentRatio(cherrypickids,getDataByID,cloneKey) {
	const grossRentRevenue = Number(cherrypickids['grossRentRevenue'] && getDataByID(cherryPickIdGenerator(cherrypickids['grossRentRevenue'], cloneKey)) || ''),
		totalExpenses = getTotalExpenses(cherrypickids,getDataByID,cloneKey);
	if(grossRentRevenue) {
		return ((totalExpenses/grossRentRevenue))
	}
	return 0;
}

function getTotalExpenses(cherrypickids,getDataByID,cloneKey) {
	const totalExpenses = Number(cherrypickids['totalExpenses'] && getDataByID(cherryPickIdGenerator(cherrypickids['totalExpenses'], cloneKey)) || '');

	return (totalExpenses);
}

function getProjectedNOI(grossRentRevenue, yearsToClose, noi, rentIncrementPercentage) {
	let projectedNOI = noi;
	for(let i = 1; i <= yearsToClose; i++) {
		projectedNOI = projectedNOI + (grossRentRevenue * (rentIncrementPercentage/100));
		grossRentRevenue = grossRentRevenue * (1+(rentIncrementPercentage/100));
	}
	return projectedNOI;
}

function getCashFlows(yearsToClose,
					  totalInvestmentCost,
					  netOperatingIncome,
					  netProceedsFromSale,
					  rentIncrementPercentage,
					  grossRentRevenue,debtService,cherrypickids, getDataByID, cloneKey='') {
	let cashFlows = [-totalInvestmentCost];

	let incrementedTotalExpenses = getTotalExpenses(cherrypickids,getDataByID,cloneKey);
	let expenseRentRatio = getExpenseRentRatio(cherrypickids,getDataByID,cloneKey);
	let prev = netOperatingIncome;
	for(let i = 2;i<=yearsToClose;i++) {
		grossRentRevenue = grossRentRevenue * (1+(rentIncrementPercentage/100));
		if(expenseRentRatio > EXPENSE_RENT_RATIO_THRESHOLD) {
			expenseRentRatio = expenseRentRatio - EXPENSE_RENT_RATIO_DECREMENT_FACTOR;
		}
		incrementedTotalExpenses = grossRentRevenue*expenseRentRatio;
		cashFlows.push(prev);
		prev = ((grossRentRevenue-incrementedTotalExpenses)-debtService);
	}
	cashFlows.push(netProceedsFromSale+prev);
	return cashFlows;
}

function getNetProceedsFromSale(salePrice,
								emiCost,
								yearsToClose,
								propertyAnnualAppreciationPercentage,
								downPaymentPercentage,
								loanInterestRate) {
	const remainingPrincipalAmount = getRemainingPrincipalAmount(salePrice, emiCost/12, yearsToClose, downPaymentPercentage,loanInterestRate);
	const futureSalePrice = salePrice * Math.pow(1+(propertyAnnualAppreciationPercentage/100), yearsToClose);
	return ((futureSalePrice - remainingPrincipalAmount)-(0.06*futureSalePrice));
}

function getRemainingPrincipalAmount(salePrice,
									 emi,
									 yearsToClose,
									 downPaymentPercentage,
									 loanInterestRate){
	let principalAmount = salePrice * ((100 - downPaymentPercentage) / 100);
	if(principalAmount < 0.1 || emi < 0.1) {
		return 0;
	}
	let principalPaid = 0.0;
	const interestRatePerMonth = (loanInterestRate / (12 * 100));
	for(let i = 0;i <= yearsToClose*12; i++) {
		principalPaid = emi - (principalAmount * interestRatePerMonth);
		principalAmount -= principalPaid;
	}
	return principalAmount;
}

function getPaidPrincipalAmount(principalAmount,emiCost,loanInterestRate,yearsToClose=1) {
	const interestRatePerMonth = (loanInterestRate / (12 * 100));
	let monthlyPrincipal = 0;
	let principalPaid = 0;
	for(let i = yearsToClose * 12;i>= 0; i--) {
		monthlyPrincipal = emiCost - (principalAmount * interestRatePerMonth);
		principalAmount -= monthlyPrincipal;
		principalPaid += monthlyPrincipal;
	}
	return principalPaid;
}

export function cherryPickIdGenerator(cherrypickid, keyId){
	if(!keyId) {
		return cherrypickid;
	}
	return cherrypickid.replace(/\*/, keyId);
}

export function conditionalDecimalConvert(value,decimals=2) {
	value = Number(value);
	return value % 1 === 0 ? value : value.toFixed(decimals);
}
