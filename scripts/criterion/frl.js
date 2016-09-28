import React from 'react';

const Frl = React.createClass({
  render() {
    const { fields, setFields } = this.props;

    return (
      <div>
        <label style={{marginRight: 10}}>Lunch Plan</label>
        <select
          value={fields.frl || ''}
          onChange={(e) => {
            setFields({frl: e.target.value});
          }}
        >
          <option value="">Specify a Lunch Plan</option>
          <option value="yes">Free or Reduced Price Lunch</option>
          <option value="no">Not on Free or Reduced Price Lunch</option>
        </select>
      </div>
    );
  }
});

export default Frl;
