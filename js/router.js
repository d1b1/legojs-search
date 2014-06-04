"use strict";
window.APP = window.APP || {};
APP.Router = Backbone.Router.extend({

  routes: {
    "brick/new": "create",
    "brick/index": "index",
    "brick/:id/edit": "edit",
    "brick/:id/view": "show"
  },

  initialize: function (options) {
    this.bricks = options.collection;
    this.bricks.bind('reset', this.updateDebug, this);
    this.bricks.bind('add', this.updateDebug, this);
    this.bricks.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.bricks.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new APP.BrickNewView({
      notes: this.bricks, note: new APP.NoteModel()
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var note = this.bricks.get(id);
    this.currentView = new APP.NoteEditView({note: note});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var brick = this.bricks.get(id);

    if (!brick)
      return window.location.hash = "brick/index";

    this.currentView = new APP.BrickDetailView({
      model: brick
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new APP.IndexView({
      collection: this.bricks
    });

    $('#primary-content').html(this.currentView.render().el);

    // Call for new data.
    this.bricks.fetch()
  }
});
