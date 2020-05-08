toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],

    ['blockquote'],
    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'align': [] }],

];
var container = document.getElementById('editor');
var quill = new Quill(container, {
    modules: {
        toolbar: toolbarOptions
    },
    scrollingContainer: "#editor",
    theme: 'snow'
});

// quillTools ={
//   quill : function(){
//     return new Quill(document.getElementById('editor'), {
//       modules: {
//         toolbar: ['bold', 'italic', 'underline', 'strike']
//       },
//       theme: 'snow'
//     });
//   }
// };
//
// quill = quillTools.quill();
