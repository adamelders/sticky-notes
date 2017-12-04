(function () {
  "use strict";
  var app = angular.module('notesApp', []);
  
  app.controller('NotesController', function() {
    this.notes = savedNotes;
    this.notesHidden = false;
    this.createFormHidden = true;
    
    this.hideNotes = function(value) {
      if (value === true)
        this.notesHidden = true;
      else if (value === false)
        this.notesHidden = false;
    };
    
    this.hideCreateForm = function(value) {
      if (value === true)
        this.createFormHidden = true;
      if (value === false)
        this.createFormHidden = false;
    };
  });
  
  app.directive("noteTemplate", function() {
    return {
      restrict: "E",
      templateUrl: "note-template.html"
    };
  });
  
  app.directive("createTemplate", function() {
    return {
      restrict: "E",
      templateUrl: "create-template.html"
    };
  });
  
  /* Custom filter to display HTML without sanitization */
  app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  
  /* Temporary object to store notes data, will factor this out to a JSON file */
  /* later so we can store notes in a local file. */
  var savedNotes = [
    {
      title: "ToDo List",
      content: "1. Learn JavaScript<br><br>2. Learn AngularJS<br><br>3. Create AngularJS Example!",
      createdOn: 1512104400000 /* 12/01/2017 */
    },

    {
      title: "Test Title",
      content: "This is some test content.<br><br>This is some more <em>test content</em>.<br><br>These notes support HTML formatting.",
      createdOn: 1512190800000 /* 12/02/2017 */
    }
  ];
  
})();