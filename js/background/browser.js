/**
 * User: ramon
 * Date: 1/25/14 12:17 PM
 */
var browser = {
  // extension
  getExtensionURL: function(path) {
    return chrome.extension.getURL(path);
  },

  getExtensionViews: function(props) {
    return chrome.extension.getViews(props);
  },

  // tab
  createTab: function(props, callback) {
    chrome.tabs.create(props, callback);
  },

  updateTab: function(id, props, callback) {
    chrome.tabs.update(id, props, callback);
  },

  queryTab: function(queryInfo, callback) {
    chrome.tabs.query(queryInfo, callback);
  }
};