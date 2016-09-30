import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';
import { saveAs } from 'file-saver';

import { BLACK, LIGHT_GRAY, GREEN, BLUE, WHITE } from './colors';
import Button from './button';
import DeleteButton from './delete-button';
import CourseGrade from './scholarships/course-grade';
import ChallengingClass from './scholarships/challenging-class';
import Criterion from './criterion';

const Scholarship = React.createClass({
  propTypes: {
    type: PropTypes.string.isRequired,
    criteria: PropTypes.array.isRequired,
    setType: PropTypes.func.isRequired,
    setFields: PropTypes.func.isRequired,
    deleteScholarship: PropTypes.func.isRequired,
    addCriteria: PropTypes.func.isRequired,
    deleteCriterion: PropTypes.func.isRequired,
    setCriterionType: PropTypes.func.isRequired,
    setCriterionFields: PropTypes.func.isRequired
  },

  exportScholarship() {
    const { id, type, fields, criteria } = this.props;
    const scholarship = {id, type, fields, criteria};
    const file = new File([JSON.stringify(scholarship)], `scholarship-${id}.txt`, {type: 'text/plain;charset=utf-8'});

    saveAs(file);
  },

  fields() {
    const { type, fields, setFields } = this.props;

    return {
      'course-grade': <CourseGrade fields={fields} setFields={setFields} />,
      'challenging-class': <ChallengingClass fields={fields} setFields={setFields} />
    }[type] || null;
  },

  render() {
    const {
      id,
      criteria,
      type,
      setType,
      deleteScholarship,
      addCriteria,
      deleteCriterion,
      setCriterionType,
      setCriterionFields
    } = this.props;

    const styles = reactCSS({
      default: {
        scholarship: {
          backgroundColor: LIGHT_GRAY,
          borderStyle: 'solid',
          borderWidth: 1,
          borderRadius: 2,
          fontFamily: 'Open Sans, sans-serif',
          padding: '20px',
          margin: '10px',
        },
        title: {
          display: 'flex',
          alignItems: 'center'
        },
        header: {
          fontFamily: 'Merriweather, serif',
          fontSize: '20px',
          color: BLACK,
          margin: '0 20px 0 0'
        }
      }
    });

    return (
      <div style={styles.scholarship}>
        <DeleteButton onClick={deleteScholarship} />
        <div style={styles.title}>
          <h2 style={styles.header}>Scholarship #{id}</h2>
          <Button backgroundColor={GREEN} onClick={addCriteria}>Add Criterion</Button>
          <Button style={{margin: '0 0 0 20px'}} backgroundColor={BLUE} onClick={this.exportScholarship}>Export Scholarship</Button>
        </div>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="">Specify a Scholarship Type</option>
          <option value="course-grade">Course Grade</option>
          <option value="challenging-class">Challenging Class</option>
        </select>
        {this.fields()}
        {
          _.map(criteria, (criterion, i) => {
            return (
              <Criterion
                key={criterion.id}
                {...criterion}
                deleteCriterion={() => {
                  deleteCriterion(i);
                }}
                setType={(type) => {
                  setCriterionType(i, type);
                }}
                setFields={(fields) => {
                  setCriterionFields(i, fields);
                }}
              />
            );
          })
        }
      </div>
    );
  }
});

export default Scholarship;
