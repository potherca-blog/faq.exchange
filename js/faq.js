(function($) {
    var $List, $ShortList;

    function handleResponseError(p_oJqXHR, p_sStatus, p_sError) {
        $List.append('<li class="error">' + p_sStatus + ': ' + p_sError + '</li>');
        console.log(p_oJqXHR, p_sStatus, p_sError);
    }

    $List = $('#list');
    $ShortList = $('#short-list');

    function fetchFaqs(p_oData, p_sStatus, p_oJqXHR) {
        var oFaq = p_oData.phpunit;

        $.ajax({
            crossDomain: true,
            dataType: 'json',
            url: oFaq.url,
            success: function(p_oData, p_sStatus, p_oJqXHR) {
                if (p_oData.items === undefined) {
                    handleResponseError(p_oJqXHR, p_sStatus, 'Could not retrieve Questions. Sorry.')
                } else {
                    $.each(p_oData.items, function(p_iIndex, p_oQuestion) {
                        var $ListItem, $Question, $Answers;

                        if (p_oQuestion.score > 0) {
                            $ShortList.append(''
                                + '<li class="list-group-item">'
                                + '<span class="badge">' + p_oQuestion.score +'</span>'
                                + '<a class="question-anchor" href="#question-' + p_iIndex + '">'
                                + p_oQuestion.title
                                + '</a>'
                                + '</li>'
                            );

                            $ListItem = $(
                                  '<li id="question-' + p_iIndex + '" class="panel panel-primary">'
                                + '<div class="panel-heading">'
                                + '<h2 class="panel-title"><a href="' + p_oQuestion.link + '">'
                                + p_oQuestion.title
                                + '</a>'
                                +'<span>'
                                + ' Question score: <span class="label label-info"'
                                + ' title="(+' + p_oQuestion.up_vote_count + '/-' + p_oQuestion.down_vote_count + ')"'
                                +'>' + p_oQuestion.score +'</span>'
                                +'</span>'
                                +'</h2>'
                                + '</div>'
                                + '</li>'
                            );

                            $Question = $(''
                                + '<div class="question panel-body">'
                                + p_oQuestion.body
                                + '</div><!--/.question-->'
                            );

                            $Answers = $(''
                                + '<ol class="answers">'
                                + '</ol><!--/.answers-->'
                            );

                            $ListItem.append($Question);
                            $ListItem.append($Answers);
                            $List.append($ListItem);

                            p_oQuestion.answers.sort(function (a, b) {
                                return b.score - a.score;
                            });

                            $.each(p_oQuestion.answers, function(p_i, p_oAnswer) {
                                var $Answer;

                                if (p_oAnswer.score > 0) {
                                    $Answer = $(
                                        '<li class="answer">'
                                        + '<h3 class="' + (p_oAnswer.is_accepted?'bg-success text-success':'bg-info text-info') + '">'
                                        + ' <a href="' + p_oAnswer.link + '" class="' + (p_oAnswer.is_accepted?'text-success glyphicon glyphicon-ok':'') + '">'
                                        + 'Answer scoring <span class="label label-default">' + p_oAnswer.score + '</span>'
                                        + '</a><small>'
                                        + ' (+' + p_oAnswer.up_vote_count + '/-' + p_oAnswer.down_vote_count + ')'
                                        + '</small></h3>'
                                        + p_oAnswer.body
                                        + '</li><!--/.answer-->'
                                    );
                                    $Answers.append($Answer);
                                }
                            });
                        }
                    });
                    $('pre').addClass('prettyprint lang-' + oFaq.syntax);
                    prettyPrint();
                    smoothScroll();
                    $('#search').filterFor('#short-list');
                }
            },
            error: handleResponseError
        });
    }

    /* Starting... */
    /* Get the list of FAQs */
    /* Get the right FAQ URL from the list */
    /* Populate the page with data from the FAQ URL*/
    /* Done. */
    $.ajax({
        dataType: 'json',
        url : './js/faq-list.json',
        success: fetchFaqs,
        error: handleResponseError
    });

}(jQuery));

/*EOF*/
