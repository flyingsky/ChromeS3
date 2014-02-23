/**
 * User: ramon
 * Date: 2/15/14 9:18 AM
 */
App.Object = DS.Model.extend({
  key: DS.attr('string'),
  lastModified: DS.attr('date'),
  size: DS.attr('number'),
  isFolder: DS.attr('boolean', {defaultValue: false}),
  objectWrap: DS.belongsTo('objectWrap'),
  objectLink: function(){
    return this.get('objectWrap.bucket') + this.get('objectWrap.delimiter') + this.get('key');
  }.property('objectWrap.bucket', 'objectWrap.delimiter', 'key')
//  bucket: DS.belongsTo('bucket')
});

App.ObjectWrap = DS.Model.extend({
  bucket: DS.attr('string'),
  prefix: DS.attr('string'),
  marker: DS.attr('string'),
  delimiter: DS.attr('string'),
  isTruncated: DS.attr('boolean'),
  objects: DS.hasMany('object'),
  folders: function(){
    var me = this;
    var folders = [
      {
        isRoot: true,
        name: 'All Buckets'
      }
    ];
    var path = me.get('bucket') + me.get('delimiter') + (me.get('prefix') ? me.get('prefix') : '');
    if (path) {
      var subFolders = path.split(me.get('delimiter'));
      var prefix = '';
      subFolders.forEach(function(subFolder){
        if (subFolder) {
          prefix += subFolder + me.get('delimiter');
          folders.push({
            name: subFolder,
            objectLink: prefix
          });
        }
      });
    }

    if (folders.length > 1) {
      folders[folders.length - 1].isActive = true;
    }

    return folders;
  }.property('prefix')
});

App.ObjectWrapSerializer = DS.JSONSerializer.extend({

  /*
   @param {DS.Store} store
   @param {subclass of DS.Model} type
   @param {Object} payload
   @param {String} id
   @param {'find'|'createRecord'|'updateRecord'|'deleteRecord'} requestType
   @returns {Object} the primary response to the original request
   */
  extractSingle: function(store, type, payload, recordId, requestType) {
    var me = this;
    var objects = [];
    var bucket = recordId.split(payload.Delimiter)[0];
    var objectWrap = store.createRecord(type, {
      id: recordId + '-objectWrap',
      // TODO: better idea??? recordId may contain object name
      bucket: bucket,
      prefix: payload.Prefix,
      marker: payload.Marker,
      delimiter: payload.Delimiter,
      isTruncated: payload.IsTruncated
    });
    me._parseFolders(store, 'object', payload, objects);
    me._parseObjects(store, 'object', payload, objects);
    objectWrap.objects = objects;
    objects.forEach(function(obj){
      obj.set('objectWrap', objectWrap);
    })
    return objectWrap;
  },

  extractArray: function(store, type, payload) {

  },


  //<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<ListBucketResult xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Name>creative-source-bucket</Name>
  // <Prefix>creative/</Prefix>
  // <Marker>creative/</Marker>
  // <MaxKeys>100</MaxKeys>
  // <Delimiter>/</Delimiter>
  // <IsTruncated>false</IsTruncated>
  // <Contents><Key>creative/README.txt</Key><LastModified>2013-08-16T18:02:08.000Z</LastModified><ETag>&quot;f6853445f59f9c58cfbaa46380724015&quot;</ETag><Size>229</Size><Owner><ID>82f02ca79829adcbfd794bd6a3a2093b3695d08d290856e270faf975336a8f75</ID><DisplayName>duckmoose</DisplayName></Owner><StorageClass>STANDARD</StorageClass></Contents>
  // <Contents><Key>creative/format</Key><LastModified>2013-08-16T18:03:24.000Z</LastModified><ETag>&quot;1dcca23355272056f04fe8bf20edfce0&quot;</ETag><Size>2</Size><Owner><ID>82f02ca79829adcbfd794bd6a3a2093b3695d08d290856e270faf975336a8f75</ID><DisplayName>duckmoose</DisplayName></Owner><StorageClass>STANDARD</StorageClass></Contents>
  // <CommonPrefixes><Prefix>creative/branches/</Prefix></CommonPrefixes>
  // <CommonPrefixes><Prefix>creative/conf/</Prefix></CommonPrefixes>
  // <CommonPrefixes><Prefix>creative/dav/</Prefix></CommonPrefixes>
  // <CommonPrefixes><Prefix>creative/db/</Prefix></CommonPrefixes>
  // <CommonPrefixes><Prefix>creative/hooks/</Prefix></CommonPrefixes>
  // <CommonPrefixes><Prefix>creative/locks/</Prefix></CommonPrefixes>
  // </ListBucketResult>"

  _parseFolders: function(store, type, payload, objects) {
    if (!payload.CommonPrefixes || payload.CommonPrefixes.length == 0) {
      return false;
    }

    var prefixes = payload.CommonPrefixes;
    prefixes.forEach(function(obj) {
      var key = obj.Prefix;
      objects.push(store.createRecord(type, {
        id: key,
        key: key,
        isFolder: true
      }));
    });

    return true;
  },

  _parseObjects: function(store, type, payload, objects) {
    var contents = payload.Contents;
    for (var i = 0, len = contents.length; i < len; i++) {
      var object = contents[i];
      // ignore folder itself
      if (payload.Prefix == object.Key) {
        continue;
      }

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