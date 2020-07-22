import React, { Component }  from "react";
import { injectIntl } from "react-intl";
import './common.css';

class CommentWithLikes extends Component {

    constructor(props) {
        super(props);
        this.getLikeLabel = this.getLikeLabel.bind(this);
      }

    getLikeLabel(likeCount) {
        if (likeCount === 1) {
            return this.props.intl.messages["pages.like"]
        } else {
            return this.props.intl.messages["pages.likes"]
        }
    }

    render() {
        return (
            <div className={"d-flex flex-row mb-3 border-bottom justify-content-between " + this.props.className}>
                <div className="hoverable">
                    <img src={this.props.data.thumb} alt={this.props.data.name}
                        className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                </div>
                <div className="pl-3 flex-grow-1">
                    <div className="hoverable">
                        <p className="font-weight-medium mb-0">{this.props.data.name}</p>
                        <p className="text-muted mb-0 text-small">{this.props.data.data}</p>
                    </div>
                    <p className="mt-3">
                        {this.props.data.detail}
                    </p>
                </div>
                <div className="comment-likes">
                    <span className="post-icon">
                        <div className="hoverable">
                            <span>
                                {
                                    this.props.data.likes > 0 ? this.props.data.likes + " " + this.getLikeLabel(this.props.data.likes) : ""
                                }
                            </span>
                            <i className="simple-icon-heart ml-2"></i>
                        </div>
                    </span>
                </div>
            </div>
        );
    }
}

export default injectIntl(CommentWithLikes);