;(function() {
  'use strict';

  angular.module('nixel', ['ui.router'])

  .config(function($stateProvider) {

    $stateProvider
      .state('editor', {
        url: '',
        views: {
          'main': {
            templateUrl: '../templates/main.template.html',
            controller : 'mainController',
          },
          'file': {
            templateUrl: '../templates/file.template.html',
            controller : 'fileController',
          },
          'edit': {
            templateUrl: '../templates/edit.template.html',
            controller: 'editController',
          },
          'tools': {
            templateUrl: '../templates/tools.template.html',
            controller: 'toolController',
          },
          'chr' : {
            templateUrl: '../templates/chr.template.html',
            controller: 'chrController',
          },
        },
      });


  });


}());
