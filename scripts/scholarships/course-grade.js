import React, { PropTypes }  from 'react';
import reactCSS from 'reactcss';

import Amount from './fields/amount';

const CourseGrade = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    setFields: PropTypes.func.isRequired
  },

  render() {
    const { fields, setFields } = this.props;

    const styles = reactCSS({
      default: {
        grades: {
          height: '117px',
          width: '100px'
        }
      }
    });

    return (
      <div>
        <Amount amount={fields.amount} setFields={setFields} />
        <select
          style={styles.grades}
          multiple={true}
          value={fields.grades || []}
          onChange={(e) => {
            const grades = [...e.target.options].filter((option) => {
              return option.selected;
            }).map((option) => { return option.value; });

            setFields({grades});
          }}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>
    );
  }
});

export default CourseGrade;
