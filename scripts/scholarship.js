import _ from 'lodash';
import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { LIGHT_GRAY } from './colors';
import DeleteButton from './delete-button';
import Criterion from './criterion';

const Scholarship = React.createClass({
  propTypes: {
    criteria: PropTypes.array.isRequired,
    deleteScholarship: PropTypes.func.isRequired,
    addCriteria: PropTypes.func.isRequired,
    setCriterionType: PropTypes.func.isRequired,
    setCriterionFields: PropTypes.func.isRequired
  },

  render() {
    const {
      id,
      criteria,
      deleteScholarship,
      addCriteria,
      setCriterionType,
      setCriterionFields
    } = this.props;

    const styles = reactCSS({
      default: {
        scholarship: {
          backgroundColor: LIGHT_GRAY,
          fontFamily: 'Open Sans, sans-serif'
        }
      }
    });

    return (
      <div style={styles.scholarship}>
        <DeleteButton onClick={deleteScholarship} />
        <h2>Scholarship #{id}</h2>
        <button type="button" onClick={addCriteria}>Add Criteria</button>
        {
          _.map(criteria, (criterion, i) => {
            return (
              <Criterion
                key={criterion.id}
                {...criterion}
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
