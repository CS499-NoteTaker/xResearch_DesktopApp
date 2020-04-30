// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//IF NO INTERNET CONNECTION, THIS APP WILL NOT WORK, HANDLE THAT.
var selection;
var pageX;
var pageY;


arr = {
    "ht": []
}
var main = function() {
    //adding context menu on right click for summarizing
    $(document).ready(function() {

        $(document).on('contextmenu', function(ev) {
            ev.preventDefault();
            var r = quill.getSelection();
            if (r.length > 0) {
                var selectedText = quill.getText(r.index, r.length);
                $('ul.tools').css({
                    'left': pageX,
                    'top': pageY - 20
                }).fadeIn(200);
            } else {
                $('ul.tools').fadeOut(200);
            }
        });

        $(document).on("click", function(e) {
            $('ul.tools').fadeOut(200);
        });

        $(document).on("mousedown", function(e) {
            pageX = e.pageX;
            pageY = e.pageY;
        });

        //prevent deselecting selected text while clicking on context menu
        $('.tools').on("mousedown", function(e) {
            e.preventDefault();
        });



    });

    let ConvertToHtmlButton = document.getElementById("KeepInArray");
    ConvertToHtmlButton.addEventListener("click", convertToHtml);

    let ConvertToPdfButton = document.getElementById("ConvertToPdfButton");
    ConvertToPdfButton.addEventListener("click", convertToPdf);

    //prevent deselecting texts



    //POSTING summary
    //   document.addEventListener("click",function(){
    //     var settings = {
    //   "url": "https://api.meaningcloud.com/summarization-1.0?key=b04fb691028f9f684dc058c2a3dc31f6&txt=Interrupts are generated by hardwares, and they are passive means if there is any instruction running then interrupts will have to wait.Interrupts are hardwares, and It’s caused by external events. It will not repeat since it is caused by external events, and can be handled by jump statements. Interrupts are asynchronous events since they are caused by external events.Traps are softwares, and it’s caused by softwares like dividing by zeroes. It can be repeated according to the calling of instructions, and cannot be handled by jump statements. Traps are synchronous events.&sentences=1",
    //   "method": "POST",
    //   "timeout": 0,
    // };
    //
    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });
    //   });

};
//summarize the selected text by the user
//Not gonna summarize codes
var summarizeWords = function() {
        var text = "";
        var indexArr = [];
        var arr = [];
        var words = "";
        //quill method that returns true or false whether the user has selected the text or not
        var start = 0; // start of the <p>
        var end = 0; // end of the </p>
        var quillHtml = String(quill.root.innerHTML); //to search from start to end in HTML
        //will have two pointers to detect start and end of paragraphs to summarize
        var temp = quillHtml; //temp variable to slice throught the html
        console.log(quillHtml);
        start = quillHtml.indexOf('<p>') + 3; //getting paragraph start index
        end = quillHtml.indexOf('</p>');
        var tempContainer = document.createElement('div')
        var tempQuill = new Quill(tempContainer);
        tempQuill.setContents(words);
        words = quillHtml.slice(start, end);
        console.log("THe word is", words);
        indexArr.push(start);


    }
    //can selected text to summarize

var summarizeWords2 = function() {
    var data = "";
    selection = quill.getSelection();
    console.log(selection);
    var selectedContent = quill.getContents(selection.index, selection.length);
    var tempContainer = document.createElement('div')
    var tempQuill = new Quill(tempContainer);
    tempQuill.setContents(selectedContent);
    console.log("SetCont is " + tempQuill.getText());
    data = "key=39707fcc6822fef005f8d53c236f3df4&sentence=" + tempQuill.getText();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quill.enable(true); //set quill back to edit
            quill.focus(); //back to focus
            document.getElementById("add").innerHTML = "Request Passed!";
            console.log("Done!");
            $('#loading-indicator').hide();


            quill.deleteText(selection.index, selection.length);
            quill.insertText(selection.index, this.responseText);
        } else if (this.readyState == 4 && this.status != 200) {
            $('#loading-indicator').hide();
            quill.enable(true);
            quill.focus();
            document.getElementById("add").innerHTML = "Request failed!";
        }

    }
    xhttp.open("POST", "http://eazymind.herokuapp.com/arabic_sum/eazysum", true);
    xhttp.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    quill.enable(false); //set quill to be uneditable
    quill.blur(); //take out focus
    $('#loading-indicator').show(); //loading indicator



    // if(response.summary[0] == '\''){
    //
    //   response.summary = response.summary.slice(1,response.summary.length);
    // }
    // if( response.summary[response.summary.length-1] == '\''){
    //   response.summary = response.summary.slice(0,response.summary.length-1);
    // }
}

//will need to use part of this code to be able to convert to html for summarization
var convertToHtml = function(e) {
    //Gets the Delta object
    var delta = quill.getContents();
    console.log("content", quill.getContents());

    var length = quill.getLength();
    console.log("Length: " + length);

    var text = quill.getText(0, length);
    console.log(text);

    var quillHtml = String(quill.root.innerHTML);
    console.log(quillHtml);

    //document.getElementById("htmlTextBox").textContent = quillHtml;
    //after converting to html, put that quillHtml into the array.
    arr.ht.push(quillHtml);
    console.log(typeof arr.ht[0])
    display_array();
    quill.deleteText(0, quill.getLength());
};


function display_array() {
    var e = "";
    for (var i = 0; i < arr.ht.length; i++) {
        e += "<li/><a/> Element " + i + " = " + arr.ht[i].substring(0, 10) + "<br/>";
    }
    console.log(e);
    document.getElementById("myUL").innerHTML = e;
}


//want to create new quillbox to write new thing every time.IMPORTANT
//The issue now is DONT DELETE THE ARRAY WHEN YOU CANCEL THE DOWNLOAD.
//WE DON'T WANNA SHOW THIS BUTTON UNTIL THE USER HAS PUSHED SOME CONTENT TO ARRAY VERY IMPORTNAT
var convertToPdf = function(e) {
    //  var htmlData = String(document.getElementById("htmlTextBox").textContent);
    //getting array of htmls as string
    if (arr.ht.length === 0) {
        arr.ht.push("");
    }
    var htmlData = JSON.stringify(arr);
    console.log(htmlData)
        //adds html Data to json array object
        //using xhr
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    //used onreadystatechange (yes) ||    onload(no)
    xhr.addEventListener("readystatechange", function(e) {
        //4 means response is ready!
        if (this.readyState === 4) {
            //blob object to store the response from the server.
            var blob = new Blob([this.response], { type: 'application/pdf' });
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

    xhr.open('POST', 'http://localhost:6969/document/convert', true); //open the request
    xhr.setRequestHeader('Content-Type', 'application/json'); //request body type
    /**
      Loading sign while progress
    **/
    xhr.onprogress = function(event) {
        event.loaded;
        event.total;
    };
    xhr.responseType = 'blob';

    xhr.send(htmlData);
    arr.ht = [];

    /*
function display_array()
{
   var e = "<li/>";   
   for (var i=0; y<arr.ht.length; i++) {
     e += "Element " + i + " = " + array[i].substring(0, 10) + "<br/>";
   }

   document.getElementById("myUL").innerHTML = e;
}
*/

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