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
        document.querySelector('.rated') != null
    
    rate = ->
        countup = 'javascript:pixiv.rating.rate = 10;jQuery(".rating").click();'
        location.href = countup

    if isRated()
        return


    bookmark = document.querySelector('.bookmark-container a._button')

    if not bookmark?
        return

    original_href = bookmark.href
    bookmark.href = 'javascript:void 0'

    bookmark.addEventListener('click', ->
        timeout = 50
        
        if not isRated()
            rate()
            limit = 0
            timer = setInterval( ->
                limit += 1
                if isRated() or limit >= 6
                    clearInterval(timer)
                    location.href = original_href
            , timeout)
        else
            location.href = original_href;
    , false)


pixiv_bookmark_with_star()
