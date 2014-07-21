"use strict";
window.APP = window.APP || {};
APP.Router = Backbone.Router.extend({

  routes: {
    "product/new": "create",
    "product/index": "index",
    "product/:id/edit": "edit",
    "product/:id/view": "show"
  },

  initialize: function (options) {
    this.products = options.collection;
    this.products.bind('reset', this.updateDebug, this);
    this.products.bind('add', this.updateDebug, this);
    this.products.bind('remove', this.updateDebug, this);
    this.index();
  },

  updateDebug: function () {
    $('#output').text(JSON.stringify(this.products.toJSON(), null, 4));
  },

  create: function () {
    this.currentView = new APP.ProductNewView({
      notes: this.products, note: new APP.NoteModel()
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  edit: function (id) {
    var note = this.products.get(id);
    this.currentView = new APP.NoteEditView({note: note});
    $('#primary-content').html(this.currentView.render().el);
  },

  show: function (id) {
    var product = this.products.get(id);

    if (!product)
      return window.location.hash = "product/index";

    this.currentView = new APP.ProductDetailView({
      model: product
    });

    $('#primary-content').html(this.currentView.render().el);
  },

  index: function () {
    this.currentView = new APP.IndexView({
      collection: this.products
    });

    $('#primary-content').html(this.currentView.render().el);

    // Call for new data.
    this.products.fetch()
  }
});
