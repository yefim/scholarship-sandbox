// libraries
import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import reactCSS from 'reactcss';

import Student from './student';
import Scholarship from './scholarship';

const App = React.createClass({
  getInitialState() {
    return {
      students: [],
      scholarships: []
    };
  },

  makeStudent() {
    const now = new Date();

    const student = {
      id: _.uniqueId(),
      graduationYear: now.getFullYear() + 1,
      gender: '',
      courses: []
    };

    const { students } = this.state;

    this.setState({
      students: [...students, student]
    });
  },

  makeScholarship() {
    const scholarship = {
      id: _.uniqueId(),
      criteria: []
    };

    const { scholarships } = this.state;

    this.setState({
      scholarships: [...scholarships, scholarship]
    });
  },

  deleteStudent(i) {
    let students = _.cloneDeep(this.state.students);
    students.splice(i, 1);
    this.setState({students});
  },

  setGender(i, gender) {
    let students = _.cloneDeep(this.state.students);
    students[i].gender = gender;
    this.setState({students});
  },

  addCriteria(i) {
    let scholarships = _.cloneDeep(this.state.scholarships);
    scholarships[i].criteria.push({
      id: _.uniqueId(),
      type: '',
      fields: {}
    });
    this.setState({scholarships});
  },

  setCriterionType(i, c, type) {
    let scholarships = _.cloneDeep(this.state.scholarships);
    scholarships[i].criteria[c].type = type;
    this.setState({scholarships});
  },

  setCriterionFields(i, c, fields) {
    let scholarships = _.cloneDeep(this.state.scholarships);
    const oldFields = scholarships[i].criteria[c].fields;
    scholarships[i].criteria[c].fields = _.merge({}, oldFields, fields);
    this.setState({scholarships});
  },

  render() {
    const { students, scholarships } = this.state;

    const styles = reactCSS({
      default: {
        sandbox: {
          display: 'flex'
        },
        students: {
          width: '50%'
        },
        scholarships: {
          width: '50%'
        }
      }
    });

    return (
      <div style={styles.sandbox}>
        <div style={styles.students}>
          <button type="button" onClick={this.makeStudent}>Make Student</button>
          {
            _.map(students, (student, i) => {
              return (
                <Student
                  key={student.id}
                  {...student}
                  scholarships={scholarships}
                  setGender={(gender) => {
                    this.setGender(i, gender);
                  }}
                  deleteStudent={() => {
                    this.deleteStudent(i);
                  }}
                />
              );
            })
          }
        </div>
        <div style={styles.scholarships}>
          <button type="button" onClick={this.makeScholarship}>Make Scholarship</button>
          {
            _.map(scholarships, (scholarship, i) => {
              return (
                <Scholarship
                  key={scholarship.id}
                  addCriteria={() => {
                    this.addCriteria(i);
                  }}
                  setCriterionType={(c, type) => {
                    this.setCriterionType(i, c, type);
                  }}
                  setCriterionFields={(c, fields) => {
                    this.setCriterionFields(i, c, fields);
                  }}
                  {...scholarship}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
});

render(
  <App />,
  document.getElementById('app')
);
