import React from 'react';

const Gpa = React.createClass({
  render() {
    const { fields, setFields } = this.props;

    return (
      <div>
        <label style={{marginRight: 10}}>Min GPA</label>
        <input
          style={{width: '200px'}}
          type="number"
          min="0"
          max="4"
          step="0.1"
          value={fields.gpa || ''}
          placeholder="Specify a GPA"
          onChange={(e) => {
            setFields({gpa: e.target.value});
          }}
        />
      </div>
    );
  }
});

export default Gpa;
