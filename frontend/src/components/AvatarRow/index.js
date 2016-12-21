import React from 'react';
import cn from 'classnames';
import Avatar from 'material-ui/Avatar';

import './AvatarRow.scss';

const AvatarRow = ({ avatar, className, avatarStyle, bodyStyle, size=40, valign, collapse=false, transparent=false, children, ...rest }) => (
  <div className={ cn('avatarrow', valign && `valign-${valign}`, { collapse, transparent }, className) } { ...rest }>
    <div className="avatar" style={{ width: size }}>
      <Avatar src={ avatar } size={ size } style={{ objectFit: 'cover', ...avatarStyle }} />
    </div>
    <div className="body" style={ bodyStyle }>
      { children }
    </div>
  </div>
);

AvatarRow.propTypes = {
  valign: React.PropTypes.oneOf([ 'top', 'middle', 'bottom' ]),
  collapse: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  avatar: React.PropTypes.string,
  size: React.PropTypes.number,
  className: React.PropTypes.string,
  avatarStyle: React.PropTypes.object,
  bodyStyle: React.PropTypes.object,
  children: React.PropTypes.node.isRequired,
};

export default AvatarRow;
