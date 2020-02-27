// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//IF NO INTERNET CONNECTION, THIS APP WILL NOT WORK, HANDLE THAT.
arr = {
  "ht":[]
}
var main = function() {
  //let btn = document.getElementById("index");

  let ConvertToHtmlButton = document.getElementById("KeepInArray");
  ConvertToHtmlButton.addEventListener("click", convertToHtml);

  let ConvertToPdfButton = document.getElementById("ConvertToPdfButton");
  ConvertToPdfButton.addEventListener("click", convertToPdf);

  document.addEventListener("click",function(){
    var promise = navigator.clipboard.read();
    console.log(promise);
  });




};

function addLink() {
  console.log("gets called");
        //Get the selected text and append the extra info
        var selection = window.getSelection(),
            pagelink = '<br /><br /> Read more at: ' + document.location.href,
            copytext = selection + pagelink,
            newdiv = document.createElement('div');

        console.log(selection);
        console.log("copied text is");
        console.log(copytext);

        //hide the newly created container
        newdiv.style.position = 'absolute';
        newdiv.style.left = '-99999px';

        //insert the container, fill it with the extended text, and define the new selection
        document.body.appendChild(newdiv);
        newdiv.innerHTML = copytext;
        selection.selectAllChildren(newdiv);

        window.setTimeout(function () {
            document.body.removeChild(newdiv);
        }, 100);
    }

var convertToHtml = function(e) {
  //Gets the Delta object
  var delta = quill.getContents();
  console.log( quill.getContents() );

  var length = quill.getLength();
  console.log( "Length: " + length);

  var text = quill.getText(0, length);
  console.log( text );

  var quillHtml = String(quill.root.innerHTML);
  console.log( quillHtml );

  //document.getElementById("htmlTextBox").textContent = quillHtml;
  //after converting to html, put that quillHtml into the array.
  arr.ht.push(quillHtml);
  quill.deleteText(0, quill.getLength());
};
//want to create new quillbox to write new thing every time.IMPORTANT
//The issue now is DONT DELETE THE ARRAY WHEN YOU CANCEL THE DOWNLOAD.
//WE DON'T WANNA SHOW THIS BUTTON UNTIL THE USER HAS PUSHED SOME CONTENT TO ARRAY VERY IMPORTNAT
var convertToPdf = function(e) {
//  var htmlData = String(document.getElementById("htmlTextBox").textContent);
//getting array of htmls as string
if(arr.ht.length === 0){
  arr.ht.push("");
}
var htmlData = JSON.stringify(arr);
  console.log(htmlData)
  //adds html Data to json array object
  //using xhr
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  //used onreadystatechange (yes) ||    onload(no)
  xhr.addEventListener("readystatechange",function(e){
    //4 means response is ready!
    if(this.readyState === 4){
      //blob object to store the response from the server.
      var blob = new Blob([this.response], {type: 'application/pdf'});
      var a = document.createElement("a");
      a.style = "display: none";
      document.body.appendChild(a);
      var url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Note.pdf';
      //programmatically force click the url
      a.click();
      window.URL.revokeObjectURL(url)
    }
  });

  xhr.open('POST','http://localhost:6969/document/convert',true);       //open the request
  xhr.setRequestHeader('Content-Type','application/json');              //request body type
  /**
    Loading sign while progress
  **/
  xhr.onprogress = function(event){
    event.loaded;
    event.total;
  };
  xhr.responseType = 'blob';

  xhr.send(htmlData);
  arr.ht = [];


//  console.log( htmlDataJson );

  /*
    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }
  */
};

//document.addEventListener("DOMContentLoaded", main);
main();
