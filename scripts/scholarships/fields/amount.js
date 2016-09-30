import React, { PropTypes } from 'react';

const Amount = React.createClass({
  propTypes: {
    amount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    setFields: PropTypes.func.isRequired
  },

  render() {
    const { amount, setFields } = this.props;

    return (
      <input
        type="text"
        value={amount == null ? '' : amount}
        onChange={(e) => {
          const val = e.target.value;

          if (!isNaN(+val) && !isNaN(parseInt(+val, 10)) && +val === parseInt(val, 10)) {
            setFields({amount: +val});
          } else {
            setFields({amount: val});
          }
        }}
      />
    );
  }
});

export default Amount;
