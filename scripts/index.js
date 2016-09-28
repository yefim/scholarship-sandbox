// libraries
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';

// templates
import { APP_TEMPLATE, STUDENT_TEMPLATE } from 'templates';

const Student = Backbone.Model.extend({
  defaults() {
    const now = new Date();

    return {
      id: _.uniqueId(),
      graduationYear: now.getFullYear() + 1,
      courses: [],
      gender: null,
    };
  }
});

const Students = Backbone.Collection.extend({
  model: Student
});

const StudentView = Backbone.View.extend({
  render() {
    return _.template(STUDENT_TEMPLATE)(this.model.toJSON());
  }
});

const AppView = Backbone.View.extend({
  events: {
    'click .make-student': 'makeStudent',
    'click .delete-student': 'deleteStudent'
  },

  initialize() {
    this.students = new Students();
    this.scholarships = [];

    this.listenTo(this.students, 'all', this.render);
  },

  makeStudent() {
    this.students.add({});
  },

  deleteStudent() {
  },

  render() {
    const students = this.students.map((student) => {
      const studentView = new StudentView({model: student});
      return studentView.render();
    });

    this.$el.html(_.template(APP_TEMPLATE)({
      students: students.join('')
    }));

    return this;
  }
});

$(document).ready(function() {
  const appView = new AppView();

  $('#app').html(appView.render().el);
});
