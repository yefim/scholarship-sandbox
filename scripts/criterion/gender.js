import React from 'react';

const Gender = React.createClass({
  render() {
    const { fields, setFields } = this.props;

    return (
      <div>
        <select
          value={fields.gender || ''}
          onChange={(e) => {
            setFields({gender: e.target.value});
          }}
        >
          <option value="">Specify a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    );
  }
});

export default Gender;
