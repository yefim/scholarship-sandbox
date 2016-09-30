import React, { PropTypes } from 'react';

import Num from './num';

const Amount = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    setFields: PropTypes.func.isRequired,
    max: PropTypes.bool
  },

  getDefaultProps() {
    return {
      max: false
    };
  },

  render() {
    const { fields, setFields, max } = this.props;

    return (
      <div>
        <Num
          placeholder="Specify an Amount"
          value={fields.amount}
          onChange={(val) => {
            setFields({amount: val});
          }}
        />
        {
          max
            ? <Num
                placeholder="Specify a Max Amount"
                value={fields.maxAward}
                onChange={(val) => {
                  setFields({maxAward: val});
                }}
              />
            : null
        }
      </div>
    );
  }
});

export default Amount;
