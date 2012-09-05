// ==UserScript==
// @name	pixiv_bookmark_with_star
// @description	ブックマークするときに同時に10点評価する Requirement: Chrome or Firefox
// @version	1.1
// @namespace    http://www1.icnet.ne.jp/a7v83w2r/
// @include	http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include	http://www.pixiv.net/novel/show.php?id=*
// @match	http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @match	http://www.pixiv.net/novel/show.php?id=*
// ==/UserScript==

(function(){

var isRated = function() {document.getElementById("unit").getElementsByClassName("current-rating")[0] != undefined};
//if already rated
if(isRated()) {
	return;
}

var elem = document.getElementsByClassName("bookmark")[1].getElementsByTagName("a")[0];
var href = elem.href;
elem.href = "javascript:void 0";
var handler = function() {
	elem.addEventListener("click", function(){
		var timeout = 50;
		//if not already rated
		if(!isRated()) {
			var countup = "javascript:countup_rating(10);"
			location.href = countup;
			var timer = setInterval(function(){
				if(!isRated()) {
					clearInterval(timer);
					location.href = href;
				}
			}, timeout);
		} else {
			location.href = href;
		}

	},false);
};
handler();

})();
