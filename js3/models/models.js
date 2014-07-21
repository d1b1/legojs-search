
"use strict";
APP.ProductModel = Backbone.Model.extend({

  defaults: {
    count: 0,
    brick: ""
  },

  idAttribute: "_id",

});

APP.PieceModel = Backbone.Model.extend({

  defaults: {
    count: 0,
    brick: ""
  },

  idAttribute: "_id",

});

APP.PiecesCollection = Backbone.Collection.extend({

  model: APP.PieceModel,

  initialize: function(options) {
    this.productid = options.productid;
  },

  url: function() {
    console.log('http://api.legoJS.io/product/' + this.productid + '/pieces');

    return 'http://api.legoJS.io/product/' + this.productid + '/pieces';
  },

  parse: function(data) {
    return data.manifest;
  }
});
