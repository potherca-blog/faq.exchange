/*global jQuery, globalOptions */
var faqOptions = faqOptions || {};
(function($, p_oOptions) {
    'use strict';

    var $Loader, $List, $ShortList, sSyntax, oOptions;

    function parseTemplate(p_sTemplate, p_oContext) {
        return p_sTemplate.replace(/{{([a-zA-Z\-_]+)}}/g, function(p_sMatch, p_sName) {
            return typeof p_oContext[p_sName] != 'undefined' ?
                p_oContext[p_sName] :
                p_sMatch;
        });
    }

    function handleResponseError(p_oJqXHR, p_sStatus, p_sError) {
        $List.append('<li class="error">' + p_sStatus + ': ' + p_sError + '</li>');
        console.log(p_oJqXHR, p_sStatus, p_sError);
    }

    function handleResponseSuccess(p_oData, p_sStatus, p_oJqXHR) {
        if (p_oData.items === undefined) {
            handleResponseError(p_oJqXHR, p_sStatus, 'Could not retrieve Questions. Sorry.')
        } else {
            $.each(p_oData.items, function(p_iIndex, p_oQuestion) {
                var $ListItem, $Question, $Answers;

                if (p_oQuestion.score > 0 && p_oQuestion.answers !== undefined) {
                    /** @namespace p_oQuestion.score */
                    $ShortList.append('' +
                        '<li class="list-group-item">' +
                        '<span class="badge">' + p_oQuestion.score + '</span>' +
                        '<a class="question-anchor" href="#question-' + p_iIndex + '">' +
                        p_oQuestion.title +
                        '</a>' +
                        '</li>'
                    );

                    /** @namespace p_oQuestion.down_vote_count */
                    /** @namespace p_oQuestion.up_vote_count */
                    $ListItem = $(
                        '<li id="question-' + p_iIndex + '" class="panel panel-primary">' +
                        '<div class="panel-heading">' +
                        '<h2 class="panel-title"><a href="' + p_oQuestion.link + '">' +
                        p_oQuestion.title +
                        '</a>' +
                        '<span>' +
                        ' Question score: <span class="label label-info"' +
                        ' title="(+' + p_oQuestion.up_vote_count + '/-' + p_oQuestion.down_vote_count + ')"' +
                        '>' + p_oQuestion.score + '</span>' +
                        '</span>' +
                        '</h2>' +
                        '</div>' +
                        '</li>'
                    );

                    $Question = $('' +
                        '<div class="question panel-body">' +
                        p_oQuestion.body +
                        '</div><!--/.question-->'
                    );

                    $Answers = $('' +
                        '<ol class="answers">' +
                        '</ol><!--/.answers-->'
                    );

                    $ListItem.append($Question);
                    $ListItem.append($Answers);
                    $List.append($ListItem);

                    if (p_oQuestion.answers === undefined) {
                        p_oQuestion.answers = [];
                    }

                    p_oQuestion.answers.sort(function(a, b) {
                        return b.score - a.score;
                    });

                    $.each(p_oQuestion.answers, function(p_i, p_oAnswer) {
                        var $Answer;

                        if (p_oAnswer.score > 0) {
                            /** @namespace p_oAnswer.is_accepted */
                            $Answer = $(
                                '<li class="answer">' +
                                '<h3 class="' + (p_oAnswer.is_accepted ? 'bg-success text-success' : 'bg-info text-info') + '">' +
                                ' <a href="' + p_oAnswer.link + '" class="' + (p_oAnswer.is_accepted ? 'text-success glyphicon glyphicon-ok' : '') + '">' +
                                'Answer scoring <span class="label label-default">' + p_oAnswer.score + '</span>' +
                                '</a><small>' +
                                ' (+' + p_oAnswer.up_vote_count + '/-' + p_oAnswer.down_vote_count + ')' +
                                '</small></h3>' +
                                p_oAnswer.body +
                                '</li><!--/.answer-->'
                            );
                            $Answers.append($Answer);
                        }
                    });
                }
            });

            $('pre').addClass('prettyprint lang-' + sSyntax);
            prettyPrint();
            smoothScroll();
            $('#search').filterFor('#short-list');
        }
    }

    /**
     * Get search term from URL.
     *
     * The order the URL is searched is:
     *
     *     https://one.faq.exchange/two?three#four
     *
     * 1. Sub-domain: https://search-term.faq.exchange (does not support [TAG] syntax)
     * 2. Path: https://faq.exchange/search-term
     * 3. Query: https://faq.exchange/?search-term
     * 4. Hash: https://faq.exchange/#search-term
     */
    function getSubjectFromUrl(p_oUrl) {

        const domain = document.location.host.split('.').slice(-2, -1)[0]
        let subject = document.location.host.split('.').shift()

        if (subject === domain) {
            subject = ['pathname', 'search', 'hash']
                .map(name => document.location[name])
                .map(value => value.substring(1))
                .reduce((accumulator, currentValue) => accumulator !== '' ? accumulator : currentValue, '')
        }

        return subject
    }

    function fetchFaqs(p_sSearchTerm) {
        var sReferenceUrl, sUrl, $Link, $Header, $Title;

        oOptions = $.extend({}, oOptions, {
            "title": p_sSearchTerm, // @TODO: Cleanup title (capitalise, isLtag, etc)
            "url": "https://stackoverflow.com/search?q=" + p_sSearchTerm,
            "searchTerm": p_sSearchTerm
        });
        oOptions.searchTerm = encodeURIComponent(oOptions.searchTerm);
        sSyntax = oOptions.syntax;

        $Loader.find('span').text('Loading Questions and Answers for ' + oOptions.title);

        $Header = $('.page-header h1');
        $Link = $Header.find('a');
        $Title = $Header.find('span');

        $Title.prepend($(
            parseTemplate('<a href="{{url}}">{{title}}</a>', { url: oOptions.url, title: oOptions.title })
        ));

        sReferenceUrl = $Link.attr('href') + parseTemplate(
            '#order={{sortOrder}}&sort={{sortBy}}&q={{searchTerm}}&site={{stackSite}}&filter={{filter}}',
            oOptions
        );
        $Link.attr('href', sReferenceUrl);

        sUrl = parseTemplate(
            '{{apiUrl}}?order={{sortOrder}}&sort={{sortBy}}&q={{searchTerm}}&site={{stackSite}}&filter={{filter}}',
            oOptions
        );

        $.ajax({
                crossDomain: true,
                dataType: 'json',
                url: sUrl
            })
            .done(handleResponseSuccess)
            .fail(handleResponseError);
    }

    oOptions = $.extend({}, {
        'apiUrl': 'https://api.stackexchange.com/2.2/search/advanced',
        'title': '',
        'sortOrder': 'desc',
        'sortBy': 'votes',
        'searchTerm': '',
        'syntax': '',
        'stackSite': 'stackoverflow',
        'filter': '!SC_g(LT_pJnL2lxfET--P_)p5zPQ212ioRM-*552DRcbu*sEtpTSNJ)dt(y8IgtT'
    }, p_oOptions || {});

    $Loader = $('#loading');
    $(document).ajaxStart(function() {
        $Loader.show();
    }).ajaxStop(function() {
        $Loader.hide();
    });

    $List = $('#list');
    $ShortList = $('#short-list');

    var sSubject = getSubjectFromUrl(window.location);

    fetchFaqs(sSubject);

}(jQuery, faqOptions));

/*EOF*/
