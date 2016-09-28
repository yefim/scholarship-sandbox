import React, { PropTypes } from 'react';
import reactCSS, { hover } from 'reactcss';

import { BLACK, LIGHT_BLACK } from './colors';

const DeleteButton = React.createClass({
  propTypes: {
    onClick: PropTypes.func.isRequired
  },

  render() {
    const { onClick, hover } = this.props;

    const styles = reactCSS({
      default: {
        button: {
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          float: 'right',
          outline: 'none',
          padding: '10px'
        },
        x: {
          stroke: BLACK
        }
      },
      hover: {
        x: {
          stroke: LIGHT_BLACK
        }
      }
    }, {hover});

    return (
      <button
        style={styles.button}
        type="button"
        onClick={onClick}
      >
        <svg style={styles.x} width="40" height="40" viewBox="0 0 40 40">
          <path
            fill="transparent"
            strokeLinecap="round"
            strokeWidth="5"
            d="M 10,10 L 30,30 M 30,10 L 10,30"
          />
        </svg>
      </button>
    );
  }
});

export default hover(DeleteButton);
