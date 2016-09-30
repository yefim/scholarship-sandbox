import React, { PropTypes }  from 'react';
import reactCSS from 'reactcss';

import Amount from './fields/amount';

const ChallengingClass = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    setFields: PropTypes.func.isRequired
  },

  render() {
    const { fields, setFields } = this.props;

    const styles = reactCSS({
      default: {
      }
    });

    return (
      <div>
        <Amount max={true} fields={fields} setFields={setFields} />
        <select
          multiple={true}
          value={fields.types || []}
          onChange={(e) => {
            const types = [...e.target.options].filter((option) => {
              return option.selected;
            }).map((option) => { return option.value; });

            setFields({types});
          }}
        >
          <option value="ap">AP</option>
          <option value="ib">IB</option>
          <option value="honors">Honors</option>
          <option value="advanced">Advanced</option>
          <option value="dual-enrollment">Dual Enrollment</option>
        </select>
      </div>
    );
  }
});

export default ChallengingClass;
