(function () {
  "use strict";
  var app = angular.module('notesApp', []);
  
  app.controller('NotesController', [ '$http', function($http) {
    this.createFormHidden = true;
    
    // Get the notes data from a local JSON file. Initialize empty data
    // to make sure the page loads correctly before the JSON data gets loaded.
    var notesCtrl = this;
    notesCtrl.notes = {};
    $http.get('json_store/notesData.json').success(function(data) {
      notesCtrl.notes = data;
    });    
    
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
    
    // Hide the Create form.
    this.hideCreateForm = function(value) {
      if (value === true)
        this.createFormHidden = true;
      if (value === false)
        this.createFormHidden = false;
    };
    
    // Delete a saved note.
    this.deleteNote = function(note) {
      if (note.id !== undefined) {
        
        // Get the index of the note from savedNotes.
        var index = this.notes.indexOf(note);
        
        // Remove the note from the savedNotes array object.
        this.notes.splice(index, 1);
      }
    }
  }]);
  
  // A controller to handle note creation.
  app.controller('CreateNoteController', function() {
    
    // Create an empty object to store note data.
    this.note = {};
    
    // Function to cancel creating a note, hide the create form, and
    // show the notes. Sets the current note to a new, empty object.
    this.cancelNote = function(notes) {
      notes.hideCreateForm(true); 
      notes.hideNotes(false);
      this.note = {};
    };
    
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
      
      // Replace newlines with html line break.
      var str = this.note.content;
      str = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
      this.note.content = str;
      
      // Create a unique ID.
      this.note.id = notes.notes.length + 1;
      
      // Set the creation date for the note, and add the currently saved
      // notes data to the current scope's note object. Set the new note
      // to a blank, empty object to clear the fields and data.
      // Finally, hide the create form and show the notes.
      this.note.createdOn = Date.now();
      notes.notes.push(this.note);
      this.note = {};
      notes.hideNotes(false);
      notes.hideCreateForm(true);
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
  
})();