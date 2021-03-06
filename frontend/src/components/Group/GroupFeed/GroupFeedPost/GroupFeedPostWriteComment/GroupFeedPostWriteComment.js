import React from 'react';
import { reduxForm, propTypes as reduxFormPropTypes } from 'redux-form';

import AvatarRow from 'components/AvatarRow';
import { TextFormField } from 'components/Field';
import Icon from 'components/Icon';
import IconButton from 'material-ui/IconButton';
import Paper from 'components/Paper';

import { getAvatarUrl } from 'util/user';
import { userPropType, feedPostPropType } from 'util/propTypes';

import * as Colors from 'material-ui/styles/colors';
import './GroupFeedPostWriteComment.scss';

const validate = ({ content }) => {
  const errors = {};

  if (!content || !content.length)
    errors.content = 'Speak up, my friend!';

  return errors;
};

const GroupFeedPostWriteComment = ({ feedPost, user, refreshComments, showSnackbar, submitPost, handleSubmit, reset }) => (
  <Paper full className="group-feed-post-write-comment">
    <form onSubmit={ handleSubmit(({ content }) => {
      submitPost({ content, userId: user.id, feedPostId: feedPost.id }, () => {
        reset();
        refreshComments();
      }, (err) => {
        showSnackbar('Could not add comment: ' + err);
      });
    }) }>
      <AvatarRow 
        avatar={ getAvatarUrl(user) }
        size={30} 
        rightIcon={ 
          <IconButton type="submit">
            <Icon name="send" color={ Colors.grey500 } />
          </IconButton> 
        }>
        <TextFormField 
          name="content" 
          hintText="Write a comment..." 
          underlineShow={ false } 
          style={{ fontSize: 14 }}
          errorStyle={{ display: 'none' }} />
      </AvatarRow>
    </form>
  </Paper>
);

GroupFeedPostWriteComment.propTypes = {
  ...reduxFormPropTypes,
  user: userPropType.isRequired,
  feedPost: feedPostPropType.isRequired,
  showSnackbar: React.PropTypes.func.isRequired,
  refreshComments: React.PropTypes.func.isRequired,
};

export default reduxForm({
  validate
})(GroupFeedPostWriteComment);