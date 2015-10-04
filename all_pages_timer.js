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
    //console.log (myurl + ", " + userid + ", " + totalElapsed);
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
  console.log("clicked");
  if (myurl == null || userid == null)
  {
    return;
  }
  console.log("posting...");
  var urlToPostTo = "https://45.79.184.205:5000/record_time";
  var query = 
  [{
    'user_id' : 10000000,
    'url' : myurl,
    'time' : totalElapsed
  }];

    $.ajax({
        type: "POST",
        url: urlToPostTo,
        data: JSON.stringify(query, null, '\t'),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {(console.log("post succes"))},
        error: function (errMsg) {(console.log(errMsg));}
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
    createButton();
  }
}

function createButton()
{
  buttonDiv = document.createElement("div");
  likeButton = document.createElement("button");
  dislikeButton = document.createElement("button");
  buttonDiv.id = 'buttons';
  likeButton.innerHTML = 'Liked';
  dislikeButton.innerHTML = 'Dislike';
  buttonDiv.appendChild(likeButton);
  buttonDiv.appendChild(dislikeButton);

  buttonDiv.style.position = 'fixed';
  buttonDiv.style.bottom = '20px';
  buttonDiv.style.right = '20px';
  buttonDiv.style.opacity = '.5';

  document.getElementsByTagName("body")[0].appendChild(buttonDiv);

  likeButton.addEventListener("onClick", postTimeToServer());
}

checkURLAndStartRunning();


// #buttonss{
//             position: fixed;
//             bottom : 20px;
//             right : 20px;
//             opacity: .5;
//         }
// <div id='buttonss'><button>Liked</button><button>Dislike</button></div>