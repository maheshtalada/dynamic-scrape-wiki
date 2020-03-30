import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { REQUEST_GET_COMPANIES } from '../../redux/actions/application';
import MyPagesBaseComponent from '../../components/profile/mypages-base-component';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { getImagePath } from 'utils/propertyUtil';
import DataTable from 'react-data-table-component';
import SingleSelectBoxes from 'components/common/single-select-boxes';


const Columns = [
	{
		name: 'COMPANYNAME',
		selector: 'CompanyName',
		cell : (val) => {
			return <a href={`/company/${val.EntityID}`} target="_blank">{val.CompanyName}</a>
		}
	},
	{
		name: 'ADDRESS1',
		selector: 'Address1',
	},
	{
		name: 'ADDRESS2',
		selector: 'Address2'
	},
	{
		name: 'City',
		selector: 'City'
	},
	{
		name: 'State',
		selector: 'State'
	}
];



class ListCompanies extends MyPagesBaseComponent {

	constructor(props) {
		super(props);
		//this.renderCustomDataGridRow = this.renderCustomDataGridRow.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
		this.state = {
			type : props.location.query && props.location.query.type || 'unprocessed'
		}
	}

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object
	};

	componentWillReceiveProps(props) {
		console.log(props);
	}

	render() {
		const { l } = this.context.i18n;
		const {type} = this.props.location.query;
		return (
			<div className="profile-page__layout listings">
				<div className="profile-page__section-wrap">
					<div className="profile-page__layout__profile-section">
						<div className="profile-page__layout__profile-section__listings-wrapper company-report__people">
							<div className="flex ">
								<SingleSelectBoxes
									className="search-results__control"
									boxOptions={[
										{
											"label" : "UNPROCESSED",
											'value' : "unprocessed"
										},
										{
											"label" : "PROCESSED",
											'value' : "processed"
										}
									]}
									selectedBox = {type}
									isAnyRequired={false}
									l={ txt => txt}
									analyticsData={{}}
									onChange={this.onViewChange}/>
							</div>
							<div className="profile-page__layout__profile-section__listings-wrapper__header">
							</div>
							{ this.props.response_companies && <DataTable
								data={this.props.response_companies}
								columns={Columns}
								paginationTotalRows = {this.props.response_companies.length}
								pagination
								paginationPerPage ={15}
							/>}

						</div>
					</div>
				</div>
			</div>
		)
	}

	onViewChange(type) {
		this.context.router.push({
			pathname :`/`,
			query : {type}
		});
		/*this.setState({type})*/
	}

}

const mapStateToProps = ({application}) => {
	const { response_companies} = application;
	return {response_companies};
};

export default connect(mapStateToProps)(
	connectDataFetchers(ListCompanies, [
		REQUEST_GET_COMPANIES
	], true)
);

