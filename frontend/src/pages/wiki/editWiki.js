import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

// import actions
import { 
	toggleBottomBarVisibility, toggleTopBarVisibility,
	toggleTopBarBackButtonVisibility 
} from '../../actions/pageVisibility';
import {
	fetchWikiPage
} from '../../actions/wiki';

import WikiContentTable from '../../components/WikiComponent/WikiContentTable';
import WikiSection from '../../components/WikiComponent/WikiSection';
import WikiForm from '../../components/WikiComponent/WikiForm';

class WikiDetails extends React.Component {
	componentWillMount() {
		const { wikiTitle, sectionIndex, wiki } = this.props;
		// check if the info stored in reducer matches with the one stored in URL, and if sectionIndex is valid
		if (wikiTitle === wiki.wiki.title && !this.props.wiki.needReload &&
			sectionIndex > 0 && sectionIndex <= wiki.sections.length) {
			// not altered
		} else {
			this.props.fetchWikiPage(wikiTitle);
		}
	}

	componentDidMount() {
		this.props.toggleBottomBarVisibility(true);
		this.props.toggleTopBarVisibility(true);
		this.props.toggleTopBarBackButtonVisibility(true);
	}
	componentWillUnmount() {
		this.props.toggleTopBarBackButtonVisibility(false);
	}


	render() {
		const { sectionIndex } = this.props;
		const { error, fetching, wiki, sections } = this.props.wiki;

		return (
			<div>
				{
					fetching ?
						<p> fetching resource ... </p>
					:
						error ?
							error.message ?
								<p> { error.message } </p>
							: <p>{ error }</p>
						:
							<div className="wiki-detail-wrapper">
								<h1>{ wiki.title }</h1>
								<WikiContentTable sections={ sections } />

								<div>
									{ 
										(sections.length > 0) ? (
											sections.map(function(section, idx){
												return (
													(section.WikiSection.sectionIndex === sectionIndex) ?
														<WikiForm
															wikiName = { wiki.title }
															section={ section }
															key={ idx }
														/>
													:
														<WikiSection
															wikiTitle={ wiki.title }
															section={ section } 
															key={ idx } 
														/>
												) 
											})
										) : null
									}
								</div>
							</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		wikiTitle: state.routing.locationBeforeTransitions.pathname.split("/")[3],
		sectionIndex: parseInt(state.routing.locationBeforeTransitions.pathname.split("/")[4]),
		wiki: state.wiki
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		toggleBottomBarVisibility: visibility => dispatch(toggleBottomBarVisibility(visibility)),
		toggleTopBarVisibility: visibility => dispatch(toggleTopBarVisibility(visibility)),
		toggleTopBarBackButtonVisibility: visibility => dispatch(toggleTopBarBackButtonVisibility(visibility)),
		fetchWikiPage: (title) => dispatch(fetchWikiPage(title)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WikiDetails);