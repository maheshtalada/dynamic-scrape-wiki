import React, { PureComponent } from 'react';
import people from 'containers/companies/samplep-people.json';
import DataTable from 'react-data-table-component';


const peopleColumns = [
	{
		name: 'Name',
		selector: 'name'
	},
	{
		name: 'Link',
		selector: 'link',
		cell : (val) => {
			return <a href={val.link} target="_blank">{val.link}</a>
		}
	},
	{
		name : 'Roles',
		selector : "roles",
		format : (val)=> {
			return val.roles.join(', ')
		}
	},
	{
		name : 'Full Address',
		selector : "fullAddresses"
	}
];


export default class OptimizedClass extends PureComponent {

	state = {

		selectedRows: [],
	};

	handleButtonClick = () => {

		console.log('clicked');
	}

	handleChange = state => {

		console.log('state', state.selectedRows);

		this.setState({ selectedRows: state.selectedRows });
	}

	render() {
		return (
			<div>
				<DataTable
					title="Desserts"
					data={people}
					columns={peopleColumns}
					onSelectedRowsChange={this.handleChange}
					selectableRows
				/>

				<DataTable
					title="Desserts"
					data={people}
					columns={peopleColumns}
					onSelectedRowsChange={this.handleChange}
					selectableRows
				/>
			</div>
		);
	}
}
