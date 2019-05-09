import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './PostListItem.css';

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.post.likes
    }
  }
    onLikeHandler = () => {
      this.props.onLike(this.props.post.likes, this.props.post.cuid)
    }
 
  render() {
    return (
      <div className={styles['single-post']}>
        <h3 className={styles['post-title']}>
          <Link to={`/posts/${this.props.post.slug}-${this.props.post.cuid}`} >
            {this.props.post.title}
          </Link>
        </h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
        <p className={styles['post-desc']}>{this.props.post.content}</p>
        <p className={styles['likes']} onClick={this.onLikeHandler}>LIKE  {this.props.post.likes}</p>
        <p className={styles['post-action']}><a href="#" onClick={this.props.onDelete}><FormattedMessage id="deletePost" /></a></p>
        <hr className={styles.divider} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    toggleEditPost: () => dispatch(toggleEditPost()),
    editPostRequest: (post) => dispatch(editPostRequest(props.params.cuid, post)),
  };
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PostListItem);
