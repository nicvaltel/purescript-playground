function log_click() {
  console.log("clicked");
}

document.addEventListener('DOMContentLoaded', function() {              
  document.getElementById('myButton').onclick = log_click;
});
