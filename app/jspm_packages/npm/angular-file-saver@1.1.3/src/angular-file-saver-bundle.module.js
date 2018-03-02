/* */ 
'use strict';
module.exports = 'ngFileSaver';
angular.module('ngFileSaver', []).factory('FileSaver', ['Blob', 'SaveAs', 'FileSaverUtils', require('./angular-file-saver.service')]).factory('FileSaverUtils', [require('./utils/utils.service')]).factory('Blob', ['$window', require('./dependencies/blob-bundle.service')]).factory('SaveAs', [require('./dependencies/file-saver-bundle.service')]);
