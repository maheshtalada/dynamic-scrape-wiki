import SiteConfig from '../../config';
import ColumnDataGrid from 'components/common/data-grid/column-data-grid';
const { assetsPath } = SiteConfig;
const HOW_TO_STEPS = [
    {
        'text': 'Go to QuickBooks.'
    },
    {
        'text': 'Click on Reports Menu.'
    },
    {
        'text': 'Choose "Profit and Loss Detail" Report under "Company & Financial" Sub-Menu.'
    },
    {
        'text': 'Choose "All Dates" or select a specific Date Range.'
    },
    {
        'text': 'Select "Cash" as Report Basis.'
    },
    {
        'text': 'Ensure that Income/Expenses, Date, Name, Memo, Class & Paid Amount Fields are included.'
    },
    {
        'text': 'Ensure that the Class field value is present in the report and it matches with the name of the property.'
    },
    {
        'text': 'Ensure that the transaction date is in the past and the transaction amount is not empty.'
    },
    {
        'text': 'If you want to import a single property, then, you can apply filter by Class or any other criteria that generates the transactions for that property.'
    }
],
DATA_FORMAT_SCREENSHOT = '/property-template-screens/QBPNLTemplate.png',
DATA_ELEMENTS_DATA = [
    {
        'id' : '1',
        'reportElement' : 'Class',
        'mappedElement' : 'Property Name',
        'remarks' : 'Mandatory element to indicate the name of the property to be imported.'
    },
    {
        'id' : '2',
        'reportElement' : 'Income / Expense',
        'mappedElement' : 'Type/ Sub Type',
        'remarks' : 'Each summary Income / Expense in the report will get mapped to the appropriate pre-defined type and sub type values. If the system is unable to map an Income / Expense row, it will tag it as Other Income (or) Other Expense respectively.'
    },
    {
        'id' : '3',
        'reportElement' : 'Date',
        'mappedElement' : 'Transaction Date',
        'remarks' : 'Ensure that “All Dates” option is chosen or the selected date range covers all the years.'
    },
    {
        'id' : '4',
        'reportElement' : 'Paid Amount',
        'mappedElement' : 'Amount',
        'remarks' : 'Selecting “Cash” as report basis will ensure that this amount is available in the report.'
    },
    {
        'id' : '5',
        'reportElement' : 'Name',
        'mappedElement' : 'Description',
        'remarks' : ''
    },
    {
        'id' : '6',
        'reportElement' : 'Memo',
        'mappedElement' : 'Description',
        'remarks' : ''
    }
],
DATA_ELEMENTS_HEADERS = {
    'id' : {
        'label' : '#'
    },
    'reportElement' : {
        'label' : 'Report Element'
    },
    'mappedElement' : {
        'label' : 'Mapped Element'
    },
    'remarks' : {
        'label' : 'Remarks'
    }
},
SUPPORTED_TYPES_DATA = [
    {
        'income' : 'Rental Income',
        'expenses' : 'Property Tax'
    },
    {
        'income' : 'Application Fee',
        'expenses' : 'Leasing Fee / Advertisement / Marketing'
    },
    {
        'income' : 'Pet Fee',
        'expenses' : 'HOA Fee'
    },
    {
        'income' : 'Utility Reimbursement',
        'expenses' : 'Insurance'
    },
    {
        'income' : 'Laundry Income',
        'expenses' : 'Management Fee'
    },
    {
        'income' : 'Miscellaneous Income',
        'expenses' : 'Application Fee'
    },
    {
        'expenses' : 'Commission / Placement Fee'
    },
    {
        'expenses' : 'Repairs / Maintenance'
    },
    {
        'expenses' : 'Utilities / Pest Control'
    },
    {
        'expenses' : 'Remodeling Expense / New Appliance'
    },
    {
        'expenses' : 'Equipment Rental'
    },
    {
        'expenses' : 'Landscaping Expense'
    },
    {
        'expenses' : 'Appraisal / Inspection Expense'
    },
    {
        'expenses' : 'Bank / Security Service Charges'
    },
    {
        'expenses' : 'Closing Costs'
    },
    {
        'expenses' : 'Legal / Accounting / Professional Fee'
    },
    {
        'expenses' : 'Auto / Travel Expense'
    },
    {
        'expenses' : 'Miscellaneous Expense'
    }
],
SUPPORTED_TYPES_HEADERS = {
    'income' : {
        'label' : 'Income'
    },
    'expenses' : {
        'label' : 'Expenses'
    }
};

export const QuickBooksTemplateInfo = () => {
    return (
        <div className="template-info">
            {/* <div className="template-info__header">Instructions</div> */}
            <section className="template-info__section">
                <div className="template-info__sub-header">How to Generate</div>
                <ol>
                    {HOW_TO_STEPS.map(step => {
                        return (
                            <li>
                               {step.text}
                               {step.screenshot && <div className="template-info__img-wrap">
                                    <img src={`${assetsPath}${step.screenshot}`} alt={step.text}/>
                               </div>} 
                            </li>
                        )
                    })}
                </ol>
            </section>
            <section className="template-info__section">
                <div className="template-info__sub-header">Data Elements</div>
                <ColumnDataGrid
                    className="data-elements-grid"
					data = {DATA_ELEMENTS_DATA}
					headers = {DATA_ELEMENTS_HEADERS}
				/>
            </section>
            <section className="template-info__section">
                <div className="template-info__sub-header">Supported Types</div>
                <ColumnDataGrid
					data = {SUPPORTED_TYPES_DATA}
					headers = {SUPPORTED_TYPES_HEADERS}
				/>
                <div>Note : Security Deposit and Late Fee are ignored</div>
            </section>
        </div>
    )
}

export const TemplateDescription = ({title, text}) => {
    return (
        <div className="template-info__description">
            <div className="template-info__sub-header">
                {title}
            </div>
            <p>{text}</p>
        </div>
    )
}
