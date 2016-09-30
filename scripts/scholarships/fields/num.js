import React, { PropTypes } from 'react';

const Num = React.createClass({
  propTypes: {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
  },

  render() {
    const { value, onChange, placeholder } = this.props;

    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value == null ? '' : value}
        onChange={(e) => {
          const val = e.target.value;

          if (!isNaN(+val) && !isNaN(parseInt(+val, 10)) && +val === parseInt(val, 10)) {
            onChange(+val);
          } else {
            onChange(val);
          }
        }}
      />
    );
  }
});

export default Num;
