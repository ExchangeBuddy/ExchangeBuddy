import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import Spinner from 'react-spinkit';

import {
  fetchRecommendation
} from 'actions/wiki';

import WikiRecommendation from 'components/WikiComponent/WikiRecommendation';

class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wikisShown: [],
      value: ''
    }
  }

  componentWillMount() {
    // need to check if already in reducer ?
    this.props.fetchRecommendation();
  }

  // if user is signedin, display wiki related to his home and exchange Universities
  // as well as the related two Countries as Recommendation
  // otherwise display mostly viewed wiki OR Singapore and NUS as default (for now...)
  // later maybe can use user's location to give suggestions?
  render() {
    const { recommendWikis } = this.props;
    const { value, wikisShown } = this.state;

    return (
      <div className="container">
        <div className="wiki-recommendation-wrapper">
          <div className="recommendation-nav-bar">
            <h2>Recommended for you</h2>
          </div>
          <hr className="green-separator" style={{ width: '85%' }}></hr>

          <div className="recommendation-item-list">
          { recommendWikis.length > 0 
            ? recommendWikis.map((wikiPreview, idx) => <WikiRecommendation previewItem={ wikiPreview } key={ idx } /> )
            : <Spinner spinnerName="circle" />
          }
          </div>

        </div>

        <div className="search wiki-recommendation-wrapper">
          <h2>Search for other wikis</h2>
          <hr className="green-separator" style={{ width: '85%' }}></hr>

          <div className="recommendation-item-list">
            <TextField
              hintText="Type university or country name..." 
              className="search-textfield"
              style={{width: '50%'}}
              value={ value }
              onChange={ this.filterChange } />
          </div>

          <div className="recommendation-item-list">
            { wikisShown.length > 0 &&
              wikisShown.map((wiki, idx) => <WikiRecommendation previewItem={ wiki } key={ idx } /> )
            }
          </div>
        </div>
      </div>
    );
  }

  filterChange = (event) => {
    this.setState({...this.state, value: event.target.value});
    const { allWikis } = this.props;

    var tempList = [];
    // set a min length to filter
    if (event.target.value.length >= 3) {
      for (var i=0; i<allWikis.length; i++) {
        if (this.filterText(event.target.value, allWikis[i].name)) {
          tempList.push(allWikis[i])
        }
      }
    }
    this.setState({wikisShown:tempList});
  }

  filterText(searchText, key) {
    searchText = searchText.toLowerCase();
    key = key.toLowerCase().replace(/[^a-z0-9 ]/g, '');

    if (searchText.length < 1)
      return false;

    return searchText.split(' ').every(searchTextSubstring =>
      key.split(' ').some(s => s.substr(0, searchTextSubstring.length) == searchTextSubstring)
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recommendWikis: state.wiki.previews,
    allWikis: state.wiki.allWikis
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecommendation: () => dispatch(fetchRecommendation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wiki);