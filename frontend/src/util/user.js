import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import Avatar from 'material-ui/Avatar';

import { propExistsDeep } from './helper';
import * as Colors from 'material-ui/styles/colors';

import defaultAvatar from 'res/user.png';

export const getAvatarUrl = (user, size=64) => {
  if (!user)
    return '';

  const profilePictureUrl = user.profilePictureUrl;
  const fbUserId = user.fbUserId;

  // Using native Cloudinary
  if (profilePictureUrl)
    return profilePictureUrl;
  // Using Facebook Graph
  else if (fbUserId)
    return `https://graph.facebook.com/${fbUserId}/picture/?width=${size*2}&height=${size*2}`;
  else
    return null;
};

export const getAvatar = (user, size=64, style) => {
  const avatarUrl = getAvatarUrl(user, size);

  if (avatarUrl)
    return <Avatar src={ avatarUrl } size={size} style={style} />;
  else
    return <Avatar src={ defaultAvatar } size={size} style={style} />;
};

export const logoutUser = (cb) => {
  cookie.remove('authToken');
  browserHistory.push('/');
  cb && cb();
};