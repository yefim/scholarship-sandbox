// libraries
import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { GRAY, GREEN } from './colors';

const Student = React.createClass({
  propTypes: {
    gender: PropTypes.string.isRequired,
    graduationYear: PropTypes.number.isRequired,
    scholarships: PropTypes.array.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    setGender: PropTypes.func.isRequired
  },

  qualifies() {
    const { gender, scholarships } = this.props;

    return _.every(scholarships, (scholarship) => {
      return _.every(scholarship.criteria, (criterion) => {
        switch (criterion.type) {
          case 'gender':
            return gender && gender === criterion.fields.gender;
          case 'gpa':
            return false;
          default:
            return true;
        }
      });
    });
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
      },
      qualifies: {
        student: {
          backgroundColor: GREEN
        }
      }
    }, {
      qualifies: this.qualifies()
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
