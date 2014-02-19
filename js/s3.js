/**
 * User: ramon
 * Date: 1/25/14 6:52 PM
 */

window.s3 = {
  isConfig: false,

  updateConfig: function(props) {
    this.isConfig = true;
    if (props && props.get) {
      props = props.get('data');  //ember-data record
    }
    AWS.config.update(props || {});
    return this;
  },

  listBuckets: function(callback) {
    new AWS.S3().listBuckets({}, callback);
  },

  listObjects: function(callback, params) {
    if (typeof(params) === 'string') {
      params = {Bucket: params};
    }
    params = $.extend({Delimiter: '/'}, params);
    new AWS.S3().listObjects(params, callback);
  }
};