// libraries
import _ from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import reactCSS from 'reactcss';

import { BLACK } from './colors';
import MakeButton from './make-button';
import Student from './student';
import Scholarship from './scholarship';

const App = React.createClass({
  getInitialState() {
    return {
      students: [{
        id: _.uniqueId(),
        info: {
          graduationYear: 2017,
          gender: '',
          frl: ''
        },
        courses: []
      }],
      scholarships: [{
        id: _.uniqueId(),
        criteria: []
      }]
    };
  },

  makeStudent() {
    const now = new Date();

    const student = {
      id: _.uniqueId(),
      info: {
        graduationYear: now.getFullYear() + 1,
        gender: '',
        frl: ''
      },
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

  deleteScholarship(i) {
    let scholarships = _.cloneDeep(this.state.scholarships);
    scholarships.splice(i, 1);
    this.setState({scholarships});
  },

  setInfo(i, info) {
    let students = _.cloneDeep(this.state.students);
    const oldInfo = students[i].info;
    students[i].info = _.merge({}, oldInfo, info);
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

  deleteCriterion(i, c) {
    let scholarships = _.cloneDeep(this.state.scholarships);
    scholarships[i].criteria.splice(c, 1);
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
        header: {
          color: BLACK,
          fontFamily: 'Merriweather, serif',
          fontSize: '26px',
          margin: '20px 0 10px 0',
          textAlign: 'center'
        },
        subheader: {
          color: BLACK,
          fontFamily: 'Merriweather, serif',
          fontSize: '20px',
          margin: '0 0 20px 0',
          textAlign: 'center'
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
      <div>
        <h1 style={styles.header}>Scholarship Sandbox</h1>
        <h2 style={styles.subheader}>Build and test scholarships before they go live.</h2>
        <div style={styles.sandbox}>
          <div style={styles.students}>
            <MakeButton onClick={this.makeStudent}>Make Student</MakeButton>
            {
              _.map(students, (student, i) => {
                return (
                  <Student
                    key={`student-${student.id}`}
                    {...student}
                    scholarships={scholarships}
                    setInfo={(info) => {
                      this.setInfo(i, info);
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
            <MakeButton onClick={this.makeScholarship}>Make Scholarship</MakeButton>
            {
              _.map(scholarships, (scholarship, i) => {
                return (
                  <Scholarship
                    key={`scholarship-${scholarship.id}`}
                    addCriteria={() => {
                      this.addCriteria(i);
                    }}
                    deleteCriterion={(c) => {
                      this.deleteCriterion(i, c);
                    }}
                    setCriterionType={(c, type) => {
                      this.setCriterionType(i, c, type);
                    }}
                    setCriterionFields={(c, fields) => {
                      this.setCriterionFields(i, c, fields);
                    }}
                    {...scholarship}
                    deleteScholarship={() => {
                      this.deleteScholarship(i);
                    }}
                  />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
});

render(
  <App />,
  document.getElementById('app')
);
