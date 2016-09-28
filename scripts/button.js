import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { WHITE } from './colors';

const Button = React.createClass({
  propTypes: {
    onClick: PropTypes.func.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    style: PropTypes.object
  },

  getDefaultProps() {
    return {
      style: {}
    };
  },

  render() {
    const { backgroundColor, style, onClick } = this.props;

    const styles = reactCSS({
      default: {
        button: _.merge({}, {
          border: 'none',
          backgroundColor: backgroundColor,
          borderRadius: 2,
          cursor: 'pointer',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: 16,
          color: WHITE,
          outline: 'none',
          padding: '8px 16px'
        }, style)
      }
    });

    return (
      <button
        onClick={onClick}
        type="button"
        style={styles.button}
      >{this.props.children}</button>
    );
  }
});

export default Button;
