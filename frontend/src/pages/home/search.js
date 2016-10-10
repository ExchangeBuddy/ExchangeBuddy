import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Drawer from 'material-ui/Drawer';
import SearchInput, {createFilter} from 'react-search-input'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {toggleHomeSearchDrawerVisibility} from '../../actions/pageVisibility';
import GroupList from '../../components/HomeComponent/Search/GroupList';
import SearchBar from '../../components/HomeComponent/Search/SearchBar';
import UniversitySearchList from '../../components/HomeComponent/Search/UniversitySearchList';

const Search = React.createClass({

	render(){
		return(
			<Drawer 
			width={200} 
			openSecondary={true} 
			open={this.props.homeSearchDrawerOpen}
			disableSwipeToOpen={false}
			docked={false} 
			onRequestChange={(open) => this.props.toggleHomeSearchDrawerVisibility(open)}>
			
			<Grid>
			<Row>
			<Col xs={12}>

			<Row center="xs">
			<Col xs={10}>
			<SearchBar/>
			<GroupList/>
			<UniversitySearchList/>

			</Col>
			</Row>

			</Col>
			</Row>
			</Grid>

			

			</Drawer>
			);
	}

})



const mapDispatchToProps = (dispatch) => {
	return {
		toggleHomeSearchDrawerVisibility: visibility=>dispatch(toggleHomeSearchDrawerVisibility(visibility))
	};
};

const mapStateToProps = (state)=>{
	return {
		homeSearchDrawerOpen: state.pageVisibility.homeSearchDrawerOpen
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);