import React, { PropTypes } from 'react';
import reactCSS, { hover } from 'reactcss';

import { BLUE, WHITE } from './colors';

const MakeButton = React.createClass({
  propTypes: {
    onClick: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      hover: false
    };
  },

  render() {
    const { onClick } = this.props;
    const { hover } = this.state;

    const styles = reactCSS({
      default: {
        button: {
          backgroundColor: BLUE,
          border: 'none',
          borderRadius: 2,
          color: WHITE,
          cursor: 'pointer',
          display: 'block',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 16,
          margin: '0 auto',
          outline: 'none',
          padding: '10px 0',
          width: '180px'
        }
      },
      hover: {
        button: {
          opacity: 0.8
        }
      }
    }, {hover});

    return (
      <button
        type="button"
        style={styles.button}
        onClick={onClick}
        onMouseOver={() => { this.setState({hover: true}); }}
        onMouseOut={() => { this.setState({hover: false}); }}
      >
        {this.props.children}
      </button>
    );
  }
});

export default MakeButton;
