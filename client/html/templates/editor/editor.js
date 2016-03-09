  Template.editor.onRendered(function() {

        $('#summernote').summernote({
        height: 250,
        maxHeight:800,
        minHeight:100,
        placeholder: 'Enter some text...', // set editable area's placeholder text
        focus: true,    //set focus editable area after Initialize summernote
    });
 
});