import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';

import { GRAY, BLACK, LIGHT_BLACK } from './colors';
import DeleteButton from './delete-button';
import Gender from './criterion/gender';
import Gpa from './criterion/gpa';
import Frl from './criterion/frl';

const Criterion = React.createClass({
  propTypes: {
    type: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    setType: PropTypes.func.isRequired,
    setFields: PropTypes.func.isRequired
  },

  fields() {
    const { type, fields, setFields } = this.props;

    return {
      gender: <Gender fields={fields} setFields={setFields} />,
      gpa: <Gpa fields={fields} setFields={setFields} />,
      frl: <Frl fields={fields} setFields={setFields} />
    }[type] || null;
  },

  render() {
    const {
      type,
      setType,
      deleteCriterion
    } = this.props;

    const styles = reactCSS({
      default: {
        criterion: {
          backgroundColor: GRAY,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: LIGHT_BLACK,
          borderRadius: 2,
          margin: '20px 0',
          padding: '15px'
        },
        label: {
          color: BLACK,
          display: 'block',
          fontSize: 16,
          margin: '0 0 10px 0'
        },
        dropdown: {
          margin: '0 0 0 15px'
        }
      }
    });

    return (
      <div style={styles.criterion}>
        <DeleteButton onClick={deleteCriterion} size="20" />
        <label style={styles.label}>
          Criterion Type
          <select
            style={styles.dropdown}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="">Specify a Criterion</option>
            <option value="gender">Gender Criterion</option>
            <option value="gpa">GPA Criterion</option>
            <option value="frl">FRL Criterion</option>
          </select>
        </label>
        {this.fields()}
      </div>
    );
  }
});

export default Criterion;
