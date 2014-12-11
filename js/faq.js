(function($) {
    var $List, sUrl, $ShortList;
    
    $List = $('#list');
    $ShortList = $('#short-list');

    sUrl = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=votes&q=phpunit%20mocks&site=stackoverflow&filter=!SC_g(LT_pJnL2lxfET--P_)p5zPQ212ioRM-*552DRcbu*sEtpTSNJ)dt(y8IgtT';

    $.ajax({
        dataType: "json",
        url: sUrl,
        success: function(p_oData) {

            if (typeof p_oData.items === 'undefined') {
                $List.append('<li class="error">Could not retrieve Questions. Sorry.</li>');
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
                $('pre').addClass('prettyprint lang-php');
                prettyPrint();
                smoothScroll();
                $('#search').filterFor('#short-list');
            }
        },
        error: function(p_oJqXHR, p_sStatus, p_sError) {
            $List.append('<li class="error">' + p_sStatus + ': ' + p_sError + '</li>');
            console.log(p_oJqXHR, p_sStatus, p_sError);
        }
    });
}(jQuery));

/*EOF*/
