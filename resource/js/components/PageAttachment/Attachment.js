import React from 'react';
import PropTypes from 'prop-types';

import User from '../User/User';

export default class Attachment extends React.Component {
  constructor(props) {
    super(props);

    this._onAttachmentDeleteClicked = this._onAttachmentDeleteClicked.bind(this);
  }

  iconNameByFormat(format) {
    if (format.match(/image\/.+/i)) {
      return 'fa fa-file-image-o';
    }

    return 'fa fa-file-o';
  }

  _onAttachmentDeleteClicked(event) {
    this.props.onAttachmentDeleteClicked(this.props.attachment);
  }

  render() {
    const attachment = this.props.attachment;
    const attachmentId = attachment._id
    const formatIcon = this.iconNameByFormat(attachment.fileFormat);

    let fileInUse = '';
    if (this.props.inUse) {
      fileInUse = <span className="attachment-in-use label label-info">In Use</span>;
    }

    const fileType = <span className="attachment-filetype label label-default">{attachment.fileFormat}</span>;

    const btnTrash = (this.props.isUserLoggedIn)
        ? <a className="text-danger attachment-delete" onClick={this._onAttachmentDeleteClicked}>
            <i className="icon-trash"></i>
          </a>
        : '';

    return (
      <li>
          <User user={attachment.creator} />
          <i className={formatIcon}></i>

          <a href={attachment.url}> {attachment.originalName}</a>

          {fileType}

          {fileInUse}

          {btnTrash}
      </li>
    );
  }
}

Attachment.propTypes = {
  attachment: PropTypes.object.isRequired,
  inUse: PropTypes.bool.isRequired,
  onAttachmentDeleteClicked: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

Attachment.defaultProps = {
};
