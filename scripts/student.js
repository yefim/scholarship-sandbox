// libraries
import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { GRAY, GREEN } from './colors';
import DeleteButton from './delete-button';

const Student = React.createClass({
  propTypes: {
    gender: PropTypes.string.isRequired,
    graduationYear: PropTypes.number.isRequired,
    scholarships: PropTypes.array.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    setGender: PropTypes.func.isRequired
  },

  qualifiesForAll() {
    const { scholarships } = this.props;

    return _.every(scholarships, this.qualifiesFor);
  },

  qualifiesFor(scholarship) {
    const { gender } = this.props;

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
  },

  render() {
    const {
      id,
      gender,
      graduationYear,
      scholarships,
      deleteStudent,
      setGender
    } = this.props;

    const styles = reactCSS({
      default: {
        student: {
          backgroundColor: GRAY,
          fontFamily: 'Open Sans, sans-serif'
        }
      },
      qualifies: {
        student: {
          backgroundColor: GREEN
        }
      }
    }, {
      qualifies: scholarships.length && this.qualifiesForAll()
    });

    return (
      <div style={styles.student}>
        <DeleteButton onClick={deleteStudent} />
        <h2>Student #{id}</h2>
        <p>Graduation Year: {graduationYear}</p>
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="">Specify a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {
          _.map(scholarships, (scholarship) => {
            if (this.qualifiesFor(scholarship)) {
              return (<p key={scholarship.id}>Qualifies for Scholarship #{scholarship.id}</p>);
            } else {
              return (<p key={scholarship.id}>Does not qualify for Scholarship #{scholarship.id}</p>);
            }
          })
        }
      </div>
    );
  }
});

export default Student;
