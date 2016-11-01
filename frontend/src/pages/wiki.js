import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { toggleBottomBarVisibility, toggleTopBarVisibility,
toggleTopBarSettingsButtonVisibility } from '../actions/pageVisibility';

class Wiki extends React.Component{

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarSettingsButtonVisibility(true);
	}

	componentWillUnmount(){
		this.props.toggleTopBarSettingsButtonVisibility(false);
	}

	render() {
		return (
			<div>
				Wiki
			</div>
		);
	}

}
const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility=>dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility=>dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarSettingsButtonVisibility: visibility=>dispatch(toggleTopBarSettingsButtonVisibility(visibility))
	};
};

export default connect(null, mapDispatchToProps)(Wiki);