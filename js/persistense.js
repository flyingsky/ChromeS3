/**
 * User: ramon
 * Date: 1/29/14 1:34 PM
 */
window.persistence = {
  storage: localStorage,
  JSON_FLAG: "$json$",

  save: function(key, value) {
    var me = this;
    if (value === null || value === undefined) {
      return;
    }

    if (typeof(value) === 'object') {
      value = me.JSON_FLAG + JSON.stringify(value);
    }
    me.storage.setItem(key, value);
  },

  remove: function(key) {
    var me = this;
    me.storage.removeItem(key);
  },

  _isJSONString: function(str) {
    return str && str.indexOf(this.JSON_FLAG) == 0;
  },

  _removeJSONFlag: function(str) {
    return str.replace(this.JSON_FLAG, '');
  },

  load: function(key, defaultValue) {
    var me = this;
    var value = me.storage.getItem(key);
    if (value !== null && me._isJSONString(value)) {
      value = me._removeJSONFlag(value);
      return JSON.parse(value);
    }
    return value === null ? defaultValue : value;
  }
}