toolbarOptions = ['bold', 'italic', 'underline', 'strike']
var container = document.getElementById('editor');
var quill = new Quill(container, {
  modules: {
    toolbar: toolbarOptions
  },
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
