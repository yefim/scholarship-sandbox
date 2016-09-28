import React, { PropTypes } from 'react';

import Gender from './criterion/gender';
import Gpa from './criterion/gpa';

const Criterion = React.createClass({
  propTypes: {
    type: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    setType: PropTypes.func.isRequired,
    setFields: PropTypes.func.isRequired
  },

  fields() {
    const { type, fields, setFields } = this.props;

    return {
      gender: <Gender fields={fields} setFields={setFields} />,
      gpa: <Gpa fields={fields} setFields={setFields} />
    }[type] || null;
  },

  render() {
    const {
      type,
      setType
    } = this.props;

    return (
      <div>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="">Criterion</option>
          <option value="gender">Gender Criterion</option>
          <option value="gpa">GPA Criterion</option>
        </select>
        {this.fields()}
      </div>
    );
  }
});

export default Criterion;
