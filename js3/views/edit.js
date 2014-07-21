
"use strict";
APP.NoteEditView = Backbone.View.extend({
  // functions to fire on events
  events: {
    "click button.save": "save"
  },

  // the constructor
  initialize: function (options) {
    this.note  = options.note;
  },

  save: function (event) {
    // this keeps the form from submitting
    event.stopPropagation();
    event.preventDefault();

    // update our model with values from the form
    this.note.set({
      name: this.$el.find('input[name=name]').val(),
      category: this.$el.find('input[name=category]').val()
    });
    // we would save to the server here with
    // this.note.save();
    // redirect back to the index
    window.location.hash = "brick/index";
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#formTemplate').html(), this.note.toJSON()));
    return this;
  }
});
