var mousetimeout;
var mousemoving;
var seconds = 0, minutes = 0, hours = 0, total = 0, t;
var userChromeID = null;

function getArticleLinks(userid) 
{
	var arr = [], l = document.getElementsByClassName("title");
	for(var i=1; i < l.length; i+=2) 
	{
		arr.push(l[i].getElementsByTagName("a")[0].href);
		requestReadingTime(l[i].getElementsByTagName("a")[0].href, userid, i);
	}
	displayEstimatedReadingTime(userid, l)
}

function displayEstimatedReadingTime(userid, LinkHTMLArray)
{
	for(var i=1; i < LinkHTMLArray.length; i+=2) 
	{
		LinkHTMLArray[i].appendChild(getReadingTimeHTML(i));
	}
	setReadingTimeStyle();
}

function getReadingTimeHTML(index)
{
	var readingDiv = document.createElement("div");
	readingDiv.className = "reading_time";
	readingDiv.id = "reading_time" + index;
	readingDiv.innerHTML = "fuck u";
	return readingDiv;
}

function setReadingTimeStyle()
{
	l = document.getElementsByClassName("reading_time");
	for (var i = 0; i < l.length; i++)
	{
		l[i].style.display = "inline-block";
		l[i].style.paddingLeft = "10px";
		l[i].style.color = "#4F618E";
	}
}

function requestReadingTime(url, userid, index)
{

	var urlToPostTo = "https://45.79.184.205:5000/get_time";
	var query = 
	[{
	  "user_id" : userid,
	  "url" : url,
	  "index" : index
	}];

    $.ajax({
        type: "POST",
        url: urlToPostTo,
        data: JSON.stringify(query, null, '\t'),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {setReadingTime(data)},
        failure: function (data) {console.log("get fucked");}
    });
}

function setReadingTime(data)
{
	console.log(data);
	var obj = JSON.parse(data);
	var readingTime = obj.time;
	var index = obj.index;

	l = document.getElementsByClassName("reading_time")[index];
	l.innerHTML = reading_time;
}

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

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
    	getArticleLinks(userid);
    }
});

