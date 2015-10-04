var arr = [], l = document.links;
for(var i=0; i<l.length; i++) {
  arr.push(l[i].href);
}


var mousetimeout;
var mousemoving;
var scrolling;
var scrollingtimeout;
window.onscroll = function ()
{
  scrolling = 1;
  clearTimeout(scrollingtimeout);
  scrollingtimeout = setTimeout(function(){scrolling=0}, 5000);  
}
document.onmousemove = function()
{
  mousemoving = 1;
  clearTimeout(mousetimeout);
  mousetimeout = setTimeout(function(){mousemoving=0}, 5000);
}


var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
  if(mousemoving==1||scrolling==1)
  {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
      }
    
      h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    }
    timer();
}
function timer() {
    t = setTimeout(add, 1000);

}
timer();


/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
}

/* Clear button */
clear.onclick = function() {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}