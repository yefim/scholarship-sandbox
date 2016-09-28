import React, { PropTypes } from 'react';
import reactCSS, { hover } from 'reactcss';

const MakeButton = React.createClass({
  render() {
    const { onClick, hover } = this.props;

    const styles = reactCSS({
      default: {
        button: {
          display: 'block',
          fontFamily: 'Open Sans, sans-serif',
          margin: '0 auto'
        }
      }
    }, {hover});

    return (
      <button
        style={styles.button}
        onClick={onClick}
        type="button"
      >
        {this.props.children}
      </button>
    );
  }
});

export default hover(MakeButton);
