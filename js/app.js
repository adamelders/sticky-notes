(function () {
  var app = angular.module('notesApp', []);
  
  app.controller('NotesController', ['$sce', function ($sce) {
    this.notes = savedNotes;
    
  }]);
  
  app.directive("noteTemplate", function() {
    return {
      restrict: "E",

      templateUrl: "note-template.html"
    };
  });
  
  /* Custom filter to display HTML without sanitization */
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  
  /* Temporary object to store notes data, will factor this out to a JSON file */
  /* later so we can store notes in */
  savedNotes = [
    {
      title: "ToDo List",
      content: "1. Learn JavaScript<br><br>2. Learn AngularJS<br><br>3. Create AngularJS Example!",
      createdOn: 1512104400000 /* 12/01/2017 */
    },

    {
      title: "Test Title",
      content: "This is some test content.<br><br>This is some more <em>test content</em>.",
      createdOn: 1512190800000 /* 12/02/2017 */
    }
  ];
  
})();