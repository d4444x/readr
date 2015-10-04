var mousetimeout;
var mousemoving;
var scrolling;
var scrollingtimeout;
var seconds = 0, minutes = 0, hours = 0, totalElapsed = 0;
var myurl = null, userid = null;
var t;

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

function add() {
  if(mousemoving==1||scrolling==1)
  {
    totalElapsed++;
    console.log (myurl + ", " + userid + ", " + totalElapsed);
    seconds++;
    if (seconds >= 60) 
    {
      seconds = 0;
      minutes++;
      if (minutes >= 60) 
      {
        minutes = 0;
        hours++;
      }
    }
  }
  timer();
}

function timer() 
{
  t = setTimeout(add, 1000);
}

function postTimeToServer()
{
  if (myurl == null || userid == null)
  {
    return;
  }
  var urlToPostTo = "https://45.79.184.205:5000/record_time";
  var query = 
  [{
    'user_id' : userid,
    'url' : myurl,
    'time' : totalElapsed
  }];

    $.ajax({
        type: "POST",
        url: urlToPostTo,
        data: JSON.stringify(query, null, '\t'),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {},
        error: function (data) {}
    });
}

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

document.addEventListener("unload", postTimeToServer());

chrome.storage.sync.get('userid', function(items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {
            useToken(userid);
        });
    }

    function useToken(userid) 
    {
      userid = userid;
    }
});

function checkURLAndStartRunning()
{
  myurl = document.URL;
  if (myurl.indexOf("https://news.ycombinator.com/") === -1)
  {
    timer();
  }
}

checkURLAndStartRunning();






