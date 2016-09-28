import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';
import { saveAs } from 'file-saver';

import { BLACK, LIGHT_GRAY, GREEN, BLUE, WHITE } from './colors';
import Button from './button';
import DeleteButton from './delete-button';
import Criterion from './criterion';

const Scholarship = React.createClass({
  propTypes: {
    criteria: PropTypes.array.isRequired,
    deleteScholarship: PropTypes.func.isRequired,
    addCriteria: PropTypes.func.isRequired,
    deleteCriterion: PropTypes.func.isRequired,
    setCriterionType: PropTypes.func.isRequired,
    setCriterionFields: PropTypes.func.isRequired
  },

  exportScholarship() {
    const { id, criteria } = this.props;
    const scholarship = {id, criteria};
    const file = new File([JSON.stringify(scholarship)], `scholarship-${id}.txt`, {type: 'text/plain;charset=utf-8'});

    saveAs(file);
  },

  render() {
    const {
      id,
      criteria,
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
          {
            _.some(criteria, 'type')
              ? <Button style={{margin: '0 0 0 20px'}} backgroundColor={BLUE} onClick={this.exportScholarship}>Export Scholarship</Button>
              : null
          }
        </div>
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
