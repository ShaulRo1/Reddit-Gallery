var IMG_ID_ARR = ["#img1", "#img2", "#img3", "#img4",
				  "#img5", "#img6", "#img7", "#img8"];
var IMG_TO_TITLE_DICT = {};
var INIT_SUBREDDIT = "cats";
var TIME_SPAN = "day";
var BATCH = 1;
var GALLERY_SIZE = 8;
var CUR_SUBREDDIT = INIT_SUBREDDIT;
$(function () {
    $("#searchBox").attr("placeholder", "Enter subreddit here, e.g cats.");
	$("#postTitle").text("Here the title of the post will appear.");
	$(".gallery img").mouseout(function() {$("#postTitle").text("Here the title of the post will appear.");});
	$(".gallery img").mouseover(function() {getPostName(this.id);});
    updateImages(INIT_SUBREDDIT);
})();


function updateImages(subReddit)
{
    reddit.top(subReddit).t(TIME_SPAN).limit(GALLERY_SIZE*BATCH).fetch(function (res) 
	{	
		if(res.data.children.length < GALLERY_SIZE*BATCH)
		{
			$("#postTitle").text("There is insufficient data on the given subreddit, make sure it is valid.");
			return;
		}
		
		$("#postTitle").text("Here the title of the post will appear.");
		for (var i = 0; i < GALLERY_SIZE; i++) 
		{
			var subRedditData = res.data.children[i+((BATCH-1)*GALLERY_SIZE)].data;
			var curId = "img"+(i+1).toString();
			IMG_TO_TITLE_DICT[curId] = subRedditData.title;
			$(IMG_ID_ARR[i]).attr("src", subRedditData.thumbnail);
			$(".item-"+(i+1).toString()+" a").attr("href", "https://www.reddit.com" + subRedditData.permalink);
			
		}
	});
}

function updateBatch(id)
{
	if(id === "next")
	{
		BATCH++;
		updateImages(CUR_SUBREDDIT);
	}
	else
	{
		BATCH = Math.max(1, BATCH-1)
		updateImages(CUR_SUBREDDIT);
	}
}

function fetchFromSubreddit()
{
	CUR_SUBREDDIT = $("#searchBox").val();
	BATCH = 1;
    updateImages(CUR_SUBREDDIT);
}
function getPostName(id)
{
	$("#postTitle").text(IMG_TO_TITLE_DICT[id]);
}
