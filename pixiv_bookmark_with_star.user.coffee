`
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
`

pixiv_bookmark_with_star = ->
    isIllust = ->
        document.URL.match('illust') != null

    isRated = ->
        if isIllust()
            document.querySelector('.rated') != null
        else
            document.querySelector('#unit .current-rating') != null
    
    rate = ->
        if isIllust()
            countup = 'javascript:pixiv.rating.rate = 10;$(".rating").click();'
        else
            countup = 'javascript:countup_rating(10);'
        location.href = countup

    if isRated()
        return


    bookmark = document.querySelector('.bookmark a.ui-button')

    if not bookmark?
        return

    original_href = bookmark.href
    bookmark.href = 'javascript:void 0'

    bookmark.addEventListener('click', ->
        timeout = 150
        
        if not isRated()
            rate()
            timer = setInterval( ->
                if isRated()
                    clearInterval(timer)
                    location.href = original_href
            , timeout)
        else
            location.href = original_href;
    , false)


pixiv_bookmark_with_star()
