// ==UserScript==
// @name         natas's zhihu script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       natas
// @match        *://zhuanlan.zhihu.com/p/*
// @match        *://www.zhihu.com/question/*/answer/*
// @grant        none
// @run-at       document-end
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var currentURL = window.location.href;
    var zhuanlan = /zhuanlan/;
    var answer = /answer/;
    var answerSleep = 2000;
    var answerc = false;
    var zhuanlanc = false;
    var sideWidth;
    var articleWidth;
    var hotKeyCHar = 'z';

    if(zhuanlan.test(currentURL)){
        console.log('zhuanlan');
        $(document).keydown(function(e) {
            if (e.key==hotKeyCHar){
                zhuanlanc = !zhuanlanc;
                if (zhuanlanc){
                    $(".ColumnPageHeader").hide();
                    $(".Sticky.RichContent-actions").hide();
                    articleWidth = $(".Post-RichTextContainer").width();
                    $(".Post-RichTextContainer").width("auto");
                    $(".Post-RichTextContainer").css("margin", "auto 25px");
                    // 将时间显示在标题下
                    $(".Post-Header").append($(".ContentItem-time"));
                } else {
                    $(".ColumnPageHeader").show();
                    $(".Sticky.RichContent-actions").show();
                    $(".Post-RichTextContainer").width(articleWidth);
                    $(".Post-RichTextContainer").css("margin", "");
                }
            }
        });
    } else if (answer.test(currentURL)){
        // console.log('answer');
        $(document).keydown(function(e) {
            if (e.key==hotKeyCHar){
                answerc = !answerc;
                if (answerc){
                    $('.AppHeader').hide();
                    $("[data-za-detail-view-path-module_name='相关推荐']").hide();
                    $(".Sticky").hide();
                    sideWidth = $(".Question-mainColumn").width();
                    $(".Question-mainColumn").width("auto")
                    // 将时间显示在答案前
                    var allAnswer = $(".AnswerItem")
                    for (var i = allAnswer.length - 1; i >= 0; i--) {
                        // console.log(allAnswer[i]);
                        var stime = $(".ContentItem-time", allAnswer[i]);
                        var extra = $(".AnswerItem-extraInfo", allAnswer[i]);
                        extra.append(stime);
                    }

                } else {
                    $('.AppHeader').show();
                    $("[data-za-detail-view-path-module_name='相关推荐']").show();
                    $(".Sticky").show();
                    $(".Question-mainColumn").width(sideWidth);
                }
            }
        });
    } else {
        console.log('url not match');
    }
    console.log('it end');
})();
