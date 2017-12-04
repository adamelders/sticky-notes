(function () {
  "use strict";
  var app = angular.module('notesApp', []);
  
  app.controller('NotesController', function() {
    this.notes = savedNotes;
    this.createFormHidden = true;
    
    // Blur the notes in the background if the Create form is shown.
    this.hideNotes = function(value) {
      if (value === true) {
        var elements = document.getElementsByName("noteContainer");
        for (var i = 0; i < elements.length; i++)
          elements[i].style.webkitFilter = "blur(3px)";
      }
      else if (value === false) {
        var elements = document.getElementsByName("noteContainer");
        for (var i = 0, len = elements.length; i < len; i++)
          elements[i].style.webkitFilter = "blur(0)";
      }
    };
    
    this.hideCreateForm = function(value) {
      if (value === true)
        this.createFormHidden = true;
      if (value === false)
        this.createFormHidden = false;
    };
  });
  
  app.controller('CreateNoteController', function() {
    
    // Create an empty object to store note data.
    this.note = {};
    
    // Function to cancel creating a note, hide the create form, and
    // show the notes. Sets the current note to a new, empty object.
    this.cancelNote = function(notes) {
      notes.hideCreateForm(true); 
      notes.hideNotes(false);
      this.note = {};
    }
    
    // Adds a new note to the NotesController.notes object. This
    // will be changed to a JSON file later, so that notes are saved between sessions.
    this.addNote = function(notes) {
      
      // Crude validation, need to create a custom alert.
      if (this.note.title === undefined) {
        alert("Your note needs a title!");
        return;
      }
      
      if (this.note.content === undefined) {
        alert("Your note needs content!");
        return;
      }
      
      // Set the creation date for the note, and add the currently saved
      // notes data to the current scope's note object. Set the new note
      // to a blank, empty object to clear the fields and data.
      // Finally, hide the create form and show the notes.
      this.note.createdOn = Date.now();
      notes.notes.push(this.note);
      this.note = {};
      notes.hideNotes(false);
      notes.hideCreateForm(true);
    }
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