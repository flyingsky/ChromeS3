/**
 * User: ramon
 * Date: 1/29/14 11:05 AM
 */
App.Bucket = DS.Model.extend({
  name: DS.attr('string') //,
//  objects: DS.hasMany('objects')
});

App.BucketSerializer = DS.JSONSerializer.extend({

  /*
  @param {DS.Store} store
  @param {subclass of DS.Model} type
  @param {Object} payload
  @param {String} id
  @param {'find'|'createRecord'|'updateRecord'|'deleteRecord'} requestType
  @returns {Object} the primary response to the original request
  */
  extractSingle: function(store, type, payload, recordId, requestType) {

  },

  extractArray: function(store, type, payload) {
    var buckets = payload.Buckets;
    var records = [];
    for (var i = 0, len = buckets.length; i < len; i++) {
      records.push(store.createRecord(type, {
        name: buckets[i].Name,
        id: buckets[i].Name
      }));
    }
    return records;
  }
});