
"use strict";
APP.IndexView = Backbone.View.extend({

  // the constructor
  initialize: function (options) {
    _.bindAll(this, 'more');

    this.products = options.collection;
    this.products.bind('reset', this.addAll, this);
    this.products.bind('add', this.render, this);

    // $(window).scroll(this.more);
  },

  events: {
    'keyup .textSearch': 'search',
    'click .more': 'more',
    'scroll': 'more'
  },

  more: function() {
    this.collection.page++;

    // $('.spinner').toggleClass('active');
    this.collection.fetch( { add: true, remove: false });
  },

  search: _.debounce( function(evt) {
    var term = $('.textSearch').val();

    if (term.length > 1) {
      this.products.term = term;
      this.products.fetch();
    }
  }, 400),

  // populate the html to the dom
  render: function () {
    this.$el.html(_.template($('#indexTemplate').html(), { term: this.collection.term }));

    this.addAll();
    return this;
  },

  addAll: function () {
    // clear out the container each time you render index
    // this.$el.find('tbody').children().remove();

    _.each(this.products.models, $.proxy(this, 'addOne'));
  },

  addOne: function (product) {
    var view = new APP.TrView({
      products: this.products,
      product: product
    });
    this.$el.find("tbody").append(view.render().el);
  }
});
