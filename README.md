
FAQ Exchange
==================

[![Project Stage Badge: Development]][Project Stage Page]
[![License Badge]][GPL-3.0+]

"Frequently Asked Questions" site based on StackOverflow Questions and Answers

 Introduction
--------------

About 8 minutes into his PHPNW12 Talk [The State of PHPUnit], [Volker Dusch] mentioned that there is a lot of stuff on StackOverflow that answer all the common questions.
He also states that he would be really happy if someone would take the time to compile them into a FAQ.

So [I][Potherca] decided to build one: http://faq.exchange/phpunit-mocks/

After a first version was online, it seemed like a neat plan to implement things in a more generic way so other topics could also be supported. This has been achieved but other topic still need to be added.

Feel free to [report suggestions or bugs].

 Details
---------

The FAQ uses [Bootstrap] and [jQuery] to pull the Questions and answers straight from the [StackOverflow API] display them.

[Bootstrap]: http://getbootstrap.com/
[jQuery]: http://jquery.com/
[report suggestions or bugs]: https://github.com/potherca/faq.exchange/issues/new
[StackOverflow API]: https://api.stackexchange.com/docs/advanced-search#order=desc&sort=votes&q=phpunit%20mocks&site=stackoverflow&filter=!SC_g(LT_pJnL2lxfET--P_)p5zPQ212ioRM-*552DRcbu*sEtpTSNJ)dt(y8IgtT
[The State of PHPUnit]: http://www.phpnw.org.uk/talk/the-state-of-phpunit/
[Volker Dusch]: https://twitter.com/__edorian

[GPL-3.0+]: ./LICENSE
[Potherca]: http://pother.ca/

[License Badge]: https://img.shields.io/badge/License-GPL--3.0%2B-lightgray.svg
[Project Stage Badge: Development]: http://img.shields.io/badge/Project%20Stage-Development-yellowgreen.svg

[Project Stage Page]: http://bl.ocks.org/potherca/raw/a2ae67caa3863a299ba0/
