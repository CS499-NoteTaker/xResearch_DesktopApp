var main = function() {
  let btn = document.getElementById("index");

  let ConvertToHtmlButton = document.getElementById("ConvertToHtmlButton");
  ConvertToHtmlButton.addEventListener("click", convertToHtml);

  let ConvertToPdfButton = document.getElementById("ConvertToPdfButton");
  ConvertToPdfButton.addEventListener("click", convertToPdf);
  

  
};

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
  
  document.getElementById("htmlTextBox").textContent = quillHtml;
};

var convertToPdf = function(e) {
  var htmlData = String(document.getElementById("htmlTextBox").textContent);
  console.log(htmlData)
  //adds html Data to json array object
  var htmlDataJson = 
    {
      "htmlDataArray":[htmlData]
    };

  console.log( htmlDataJson );

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

document.addEventListener("DOMContentLoaded", main);
