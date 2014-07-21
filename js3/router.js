"use strict";
window.APP = window.APP || {};
APP.Router = Backbone.Router.extend({

  routes: {
    "builder/index": "index",
    "builder/:id/edit": "edit",
    "builder/:id/view": "show"
  },

  initialize: function (options) {
    this.pieces = options.collection;

    console.log(this.pieces);
    // this.pieces.bind('reset', this.updateDebug, this);
    // this.pieces.bind('add', this.updateDebug, this);
    // this.pieces.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.pieces.toJSON(), null, 4));
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#indexTemplate').html(), { term: this.collection.term }));

    this.addAll();
    return this;
  },

  index: function () {
    this.currentView = new APP.IndexView({
      collection: this.pieces
    });

    $('#primary-content').html(this.currentView.render().el);

    // Call for new data.
    this.pieces.fetch();
  }
});
