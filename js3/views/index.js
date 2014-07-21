
"use strict";
APP.IndexView = Backbone.View.extend({

  // the constructor
  initialize: function (options) {
    // _.bindAll(this, 'more');

    console.log('ddd', options.collection);

    this.pieces = options.collection;
    this.pieces.bind('reset', this.addAll, this);
    this.pieces.bind('add', this.render, this);

    // $(window).scroll(this.more);
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#indexTemplate').html(), { term: this.collection.term }));

    this.addAll();
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
    // this.$el.find('tbody').children().remove();

    _.each(this.pieces.models, $.proxy(this, 'addOne'));
  },

  addOne: function (product) {
    var view = new APP.TrView({
      products: this.pieces,
      product: product
    });
    this.$el.find("tbody").append(view.render().el);
  },

  afterRender: function() {
    console.log('after render');

  }
});
