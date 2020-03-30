import React, { Fragment, Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import connectDataFetchers from 'lib/connectDataFetchers.jsx';
import { REQUEST_GET_PEOPLE } from '../../redux/actions/application';
import { getAbsoluteUrl } from 'utils/urlUtil';
import { getImagePath } from 'utils/propertyUtil';
import DataTable from 'react-data-table-component';
import SingleSelectBoxes from 'components/common/single-select-boxes';

const Columns = [
	{
		name: 'Name',
		selector: 'person_name',
		cell : (val) => {
			return <a href={`/company/${val.company_people_id}`} target="_blank">{val.person_name}</a>
		}
	},
	{
		name: 'Phone',
		selector: 'person_phone',
	},
	{
		name: 'Email',
		selector: 'person_email'
	},
	{
		name: 'Address',
		selector: 'person_address'
	},
	{
		name: 'Roles',
		selector: 'person_roles',
		cell : (val) => {
			return val.person_roles && val.person_roles.replace('||', ', ');
		}
	}
];



class ListPeople extends PureComponent {

	state = {
		type : this.props.location.query && this.props.location.query.type || 'unprocessed'
	};

	static contextTypes = {
		i18n: PropTypes.object,
		router: PropTypes.object
	};

	render() {
		const { l } = this.context.i18n;
		const {response_people, location} = this.props;
		const { type } = this.state;
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
							{ response_people && <DataTable
								data={response_people}
								columns={Columns}
								paginationTotalRows = {response_people.length}
								pagination
								paginationPerPage ={15}
							/>}

						</div>
					</div>
				</div>
			</div>
		)
	}

	onViewChange = (type)=> {
		this.context.router.push({
			pathname :`/`,
			query : {type}
		});
		/*this.setState({type})*/
	}

}

const mapStateToProps = ({application}) => {
	const { response_people} = application;
	return {response_people};
};

export default connect(mapStateToProps)(
	connectDataFetchers(ListPeople, [
		REQUEST_GET_PEOPLE
	], true)
);

