
// ==UserScript==
// @name    pixiv_bookmark_with_star
// @description    ブックマークするときに同時に10点評価する Requirement: Chrome or Firefox
// @version    1.2
// @namespace    http://www1.icnet.ne.jp/a7v83w2r/
// @include    http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include    http://www.pixiv.net/novel/show.php?id=*
// @match    http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @match    http://www.pixiv.net/novel/show.php?id=*
// ==/UserScript==
;
var pixiv_bookmark_with_star;

pixiv_bookmark_with_star = function() {
  var bookmark, isIllust, isRated, original_href, rate;
  isIllust = function() {
    return document.URL.match('illust') !== null;
  };
  isRated = function() {
    if (isIllust()) {
      return document.querySelector('.rated') !== null;
    } else {
      return document.querySelector('#unit .current-rating') !== null;
    }
  };
  rate = function() {
    var countup;
    if (isIllust()) {
      countup = 'javascript:pixiv.rating.rate = 10;$(".rating").click();';
    } else {
      countup = 'javascript:countup_rating(10);';
    }
    return location.href = countup;
  };
  if (isRated()) return;
  bookmark = document.querySelector('.bookmark a.ui-button');
  if (!(bookmark != null)) return;
  original_href = bookmark.href;
  bookmark.href = 'javascript:void 0';
  return bookmark.addEventListener('click', function() {
    var timeout, timer;
    timeout = 150;
    if (!isRated()) {
      rate();
      return timer = setInterval(function() {
        if (isRated()) {
          clearInterval(timer);
          return location.href = original_href;
        }
      }, timeout);
    } else {
      return location.href = original_href;
    }
  }, false);
};

pixiv_bookmark_with_star();