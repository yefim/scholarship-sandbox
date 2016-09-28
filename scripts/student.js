// libraries
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { GRAY } from './colors';

const Student = React.createClass({
  propTypes: {
    graduationYear: PropTypes.number.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    setGender: PropTypes.func.isRequired
  },

  render() {
    const {
      id,
      gender,
      graduationYear,
      deleteStudent,
      setGender
    } = this.props;

    const styles = reactCSS({
      default: {
        student: {
          backgroundColor: GRAY
        }
      }
    });

    return (
      <div style={styles.student}>
        <button
          type="button"
          onClick={deleteStudent}
        >x</button>
        <h2>Student #{id}</h2>
        <p>Graduation Year: {graduationYear}</p>
        <select
          defaultValue={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    );
  }
});

export default Student;
