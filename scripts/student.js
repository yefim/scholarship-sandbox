// libraries
import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { GRAY, GREEN } from './colors';
import DeleteButton from './delete-button';

const Student = React.createClass({
  propTypes: {
    info: PropTypes.shape({
      gender: PropTypes.string.isRequired,
      frl: PropTypes.string.isRequired,
      graduationYear: PropTypes.number.isRequired,
    }).isRequired,
    scholarships: PropTypes.array.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    setInfo: PropTypes.func.isRequired
  },

  setFrl(e) {
    const { setInfo } = this.props;

    setInfo({frl: e.target.value});
  },

  qualifiesForAll() {
    const { scholarships } = this.props;

    return _.every(scholarships, this.qualifiesFor);
  },

  qualifiesFor(scholarship) {
    const {
      info: {
        gender,
        frl
      }
    } = this.props;

    return _.every(scholarship.criteria, (criterion) => {
      switch (criterion.type) {
        case 'frl':
          return frl && frl === criterion.fields.frl;
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
      info: {
        gender,
        frl,
        graduationYear
      },
      scholarships,
      deleteStudent,
      setInfo
    } = this.props;

    const styles = reactCSS({
      default: {
        student: {
          backgroundColor: GRAY,
          borderRadius: 2,
          fontFamily: 'Open Sans, sans-serif',
          padding: '20px',
          margin: '10px'
        },
        header: {
          fontFamily: 'Merriweather, serif',
          fontSize: 20,
          margin: '0px'
        },
        p: {
          margin: '10px 0 0 0'
        },
        radio: {
          margin: '0 15px 0 0'
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
        <h2 style={styles.header}>Student #{id}</h2>
        <p>Graduation Year: {graduationYear}</p>
        <select
          value={gender}
          onChange={(e) => {
            setInfo({gender: e.target.value});
          }}
        >
          <option value="">Specify a Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p style={styles.p}>Is the student on Free or Reduced Price Lunch?</p>
        <label style={styles.radio}>
          <input
            onChange={this.setFrl}
            checked={frl === 'yes'}
            name="frl"
            type="radio"
            value="yes"
          /> Yes
        </label>
        <label style={styles.radio}>
          <input
            onChange={this.setFrl}
            checked={frl === 'no'}
            name="frl"
            type="radio"
            value="no"
          /> No
        </label>
        <label style={styles.radio}>
          <input
            onChange={this.setFrl}
            checked={frl === 'idk'}
            name="frl"
            type="radio"
            value="idk"
          /> I Don't Know
        </label>
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
