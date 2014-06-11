// 'AJAX' file upload and check progress
function checkProgress() {
  //var percentage = ajax('GET', 'http://localhost:2000/upload.cgi?check=true');
  var percentage = CROSS.XSS.post('http://localhost:2000/upload.cgi', 'check=true');
  //document.getElementById('percentage').innerHTML = percentage + ' %';
}

function sendFile() {
  //setInterval('checkProgress()', 1000);
  document.getElementById('form').submit();
}

// AJAX functions to check progress
function createXMLHTTPRequest() {
  var XMLHTTP;
  if (window.ActiveXObject) {
    try { XMLHTTP = new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (e) { XMLHTTP = false; }
  } else {
    try { XMLHTTP = new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) { XMLHTTP = false; }
  }
  
  if (!XMLHTTP) {
    try { XMLHTTP = new XMLHttpRequest(); }
    catch (e) { XMLHTTP = false; }  
  }
  
  if (!XMLHTTP)
    alert('Unable to create AJAX request');
  else
    return XMLHTTP;
}

function ajax(type, url) {
  var XMLHTTP = createXMLHTTPRequest();
  var response = '';
  
  if (XMLHTTP.readyState == 4 || XMLHTTP.readyState == 0) {
    XMLHTTP.open(type, url, true);
    XMLHTTP.onreadystatechange = function() {
      if (XMLHTTP.readyState == 4 && XMLHTTP.status == 200) {
        response = XMLHTTP.responseText;
      } 
    }
    XMLHTTP.send(null);
    return response;
  }
  else
    setTimeout('ajax()', 1000);
}
