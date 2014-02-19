/**
 * User: ramon
 * Date: 2/15/14 9:18 AM
 */
App.Object = DS.Model.extend({
  key: DS.attr('string'),
  lastModified: DS.attr('date'),
  size: DS.attr('number'),
//  bucket: DS.belongsTo('bucket'),

  id: function(){
    return this.get('bucket.name') + '#' + this.get('key');
  }.property('bucket.name', 'key')
});

App.ObjectSerializer = DS.JSONSerializer.extend({

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
    var me = this;
    var objects = [];
    if (!me._parseFolders(store, type, payload, objects)) {
      me._parseObjects(store, type, payload, objects);
    }
    return objects;
  },


  //<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<ListBucketResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Name>creative-source-bucket</Name><Prefix>creative/</Prefix><Marker>creative/</Marker><MaxKeys>100</MaxKeys><Delimiter>/</Delimiter><IsTruncated>false</IsTruncated><Contents><Key>creative/README.txt</Key><LastModified>2013-08-16T18:02:08.000Z</LastModified><ETag>&quot;f6853445f59f9c58cfbaa46380724015&quot;</ETag><Size>229</Size><Owner><ID>82f02ca79829adcbfd794bd6a3a2093b3695d08d290856e270faf975336a8f75</ID><DisplayName>duckmoose</DisplayName></Owner><StorageClass>STANDARD</StorageClass></Contents><Contents><Key>creative/format</Key><LastModified>2013-08-16T18:03:24.000Z</LastModified><ETag>&quot;1dcca23355272056f04fe8bf20edfce0&quot;</ETag><Size>2</Size><Owner><ID>82f02ca79829adcbfd794bd6a3a2093b3695d08d290856e270faf975336a8f75</ID><DisplayName>duckmoose</DisplayName></Owner><StorageClass>STANDARD</StorageClass></Contents><CommonPrefixes><Prefix>creative/branches/</Prefix></CommonPrefixes><CommonPrefixes><Prefix>creative/conf/</Prefix></CommonPrefixes><CommonPrefixes><Prefix>creative/dav/</Prefix></CommonPrefixes><CommonPrefixes><Prefix>creative/db/</Prefix></CommonPrefixes><CommonPrefixes><Prefix>creative/hooks/</Prefix></CommonPrefixes><CommonPrefixes><Prefix>creative/locks/</Prefix></CommonPrefixes></ListBucketResult>"

  _parseFolders: function(store, type, payload, objects) {
    if (!payload.CommonPrefixes || payload.CommonPrefixes.length == 0) {
      return false;
    }

    var prefixes = payload.CommonPrefixes;
    prefixes.forEach(function(obj) {
      var key = obj.Prefix.replace(payload.Delimiter, '');
      objects.push(store.createRecord(type, {
        id: key,
        key: key
      }));
    });

    return true;
  },

  _parseObjects: function(store, type, payload, objects) {
    var contents = payload.Contents;
    for (var i = 0, len = contents.length; i < len; i++) {
      var object = contents[i];
      objects.push(store.createRecord(type, {
        id: object.Key,
        key: object.Key,
        size: object.Size,
        lastModified: object.LastModified
      }));
    }
    return true;
  }
});