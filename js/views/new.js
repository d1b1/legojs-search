
"use strict";
APP.BrickNewView = Backbone.View.extend({
  // functions to fire on events
  events: {
    "click button.save": "save"
  },

  // the constructor
  initialize: function (options) {
    this.brick  = options.brick;
    this.bricks = options.bricks;
    this.bricks.bind('invalid', this.showErrors, this);
  },

  showErrors: function (brick, errors) {
    this.$el.find('.error').removeClass('error');
    this.$el.find('.alert').html(_.values(errors).join('<br>')).show();
    // highlight the fields with errors
    _.each(_.keys(errors), _.bind(function (key) {
      this.$el.find('*[name=' + key + ']').parent().addClass('error');
    }, this));
  },

  save: function (event) {
    event.stopPropagation();
    event.preventDefault();

    // update our model with values from the form
    this.brick.set({
      name: this.$el.find('input[name=name]').val(),
      maker: this.$el.find('input[name=maker]').val(),
      description: this.$el.find('textarea[name=description]').val(),
      // just setting random number for id would set as primary key from server
      id: Math.floor(Math.random() * 100) + 1
    });
    if (this.note.isValid()){
      // add it to the collection
      this.notes.add(this.note);
      // this.note.save();
      // redirect back to the index
      window.location.hash = "brick/index";
    }
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.brick.toJSON()));
    return this;
  }
});
