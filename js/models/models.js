
"use strict";
APP.BrickModel = Backbone.Model.extend({

  defaults: {
    name: "",
    category: "",
    designId: "",
    elementId: ""
  },

  idAttribute: "_id",

  validate: function (attrs) {
    var errors = {};
    // if (!attrs.title) errors.title = "Hey! Give this thing a title.";
    if (!attrs.description) errors.description = "You gotta write a description, duh!";
    if (!attrs.author) errors.author = "Put your name in dumb dumb...";

    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
});

APP.BrickCollection = Backbone.Collection.extend({

  model: APP.BrickModel,

  // localStorage: new Backbone.LocalStorage("brick-models"),

  initialize: function(options) {
    this.term = "Window";
    this.page = 1;
  },

  url: function() {
    return 'http://api.legoJS.io/brick/search?page=' + this.page + '&size=20&name=' + ( this.term || '' );
  },

  parse: function(data) {
    return data.results;
  }
});
