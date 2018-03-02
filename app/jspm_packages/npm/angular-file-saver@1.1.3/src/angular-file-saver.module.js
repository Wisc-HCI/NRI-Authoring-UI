/* */ 
'use strict';
module.exports = 'ngFileSaver';
angular.module('ngFileSaver', []).factory('FileSaver', ['Blob', 'SaveAs', 'FileSaverUtils', require('./angular-file-saver.service')]).factory('FileSaverUtils', [require('./utils/utils.service')]).factory('Blob', ['$window', 'FileSaverUtils', require('./dependencies/blob.service')]).factory('SaveAs', ['$window', 'FileSaverUtils', require('./dependencies/file-saver.service')]);
