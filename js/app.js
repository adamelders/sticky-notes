(function () {
  var app = angular.module('notesApp', []);
  
  app.controller('NotesController', ['$sce', function ($sce) {
    this.notes = savedNotes;
    this.createdOn = Date.now();
    
  }]);
  
  app.directive("noteTemplate", function() {
    return {
      restrict: "E",

      templateUrl: "../note-template.html"
    };
  });
  
  /* Custom filter to display HTML without sanitization */
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  
  savedNotes = [
    {
      title: "ToDo List",
      content: "1. Learn JavaScript<br><br>2. Learn AngularJS",
      createdOn: 1397490980837
    },

    {
      title: "Test Title",
      content: "This is some test content.<br><br>This is some more <em>test content</em>.",
      createdOn: 1397490980837
    }
  ];
  
})();