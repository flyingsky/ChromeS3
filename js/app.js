window.App = Ember.Application.create();

App.errorHandler = function(err) {
  alert((err && err.message) || 'error!');
}

App.SettingsAdapter = DS.LSAdapter.extend({
  namespace: 'chromes3'
});

App.ApplicationAdapter = DS.Adapter.extend({
  _serverAPI: {
    'bucket': 'listBuckets',
    'object': 'listObjects'
  },

  find: function() {
    console.log('TODO find');
  },

  createRecord: function() {
    console.log('TODO createRecord');
  },

  updateRecord: function() {
    console.log('TODO updateRecord');
  },

  deleteRecord: function() {
    console.log('TODO deleteRecord');
  },

  findAll: function(store, type, sinceToken) {
    return this.findQuery(store, type, null);
  },

  findQuery: function(store, type, query) {
    console.log(type);

    var me = this,
      typeKey = type.typeKey,
      api = me._serverAPI[typeKey];

    var resolver = function(resolve, reject) {
      if (!s3[api]) {
        reject(new Error('API[' + api + '] does not exist!'));
        return;
      }

      s3[api](function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }, query);
    };

    var onFulfilled = function(result) {
      return result;
    };

    var onRejected = function(err) {
      App.errorHandler(err);
    };

    return new Ember.RSVP.Promise(resolver).then(onFulfilled, onRejected);
  },

  findMany: function() {
    console.log('TODO findMany');
  }
});
