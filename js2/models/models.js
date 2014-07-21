
"use strict";
APP.ProductModel = Backbone.Model.extend({

  defaults: {
    count: 0,
    brick: ""
  },

  idAttribute: "_id",

  validate: function (attrs) {
    var errors = {};
    // if (!attrs.title) errors.title = "Hey! Give this thing a title.";
    // if (!attrs.description) errors.description = "You gotta write a description, duh!";
    // if (!attrs.author) errors.author = "Put your name in dumb dumb...";

    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

APP.ProductCollection = Backbone.Collection.extend({

  model: APP.ProductModel,

  // localStorage: new Backbone.LocalStorage("brick-models"),

  initialize: function(options) {
    this.term = "Yoda";
    this.page = 1;
  },

  url: function() {
    return 'http://api.legoJS.io/product/search?page=' + this.page + '&size=20&name=' + ( this.term || '' );
  },

  parse: function(data) {
    return data.results;
  }
});
