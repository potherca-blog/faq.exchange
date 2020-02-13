# FAQ Exchange

The most frenquently asked questions on StackOverflow, for any given search-term.

[![Project Stage Badge: Development]][Project Stage Page]
[![License Badge]][GPL-3.0+]

"Frequently Asked Questions" site based on StackOverflow Questions and Answers

## Usage 

**faq.exchange** will display the top 30 most high scoring questions for a given topic.

The topic can be provided as a path, a query or an anchor.

That is to say, these URLs will all give you the same FAQ:

- https://faq.exchange/phpunit-mocks
- https://faq.exchange/?phpunit-mocks
- https://faq.exchange/#phpunit-mocks

Obviously, `phpunit-mocks` can be replaced with topic or search-term you like.

Feel free to [report suggestions or bugs][issues-url].

## Inception

About 8 minutes into his PHPNW12 Talk [The State of PHPUnit][state-of-phpunit], [Volker Dusch][volker-dusch] mentioned that there is a lot of stuff on StackOverflow that answer all the common questions.
He also states that he would be really happy if someone would take the time to compile them into a FAQ.

So [I][Potherca] decided to build one: https://faq.exchange/?phpunit-mocks/

After a first version was online, it seemed like a neat plan to implement things in a more generic way so other topics could also be supported. This has been achieved by using the URL as a search-term.

## Technical Details

The FAQ pulls the Questions and answers straight from the StackOverflow API:
https://api.stackexchange.com/docs/advanced-search#order=desc&sort=votes&q=phpunit%20mocks&site=stackoverflow&filter=!SC_g(LT_pJnL2lxfET--P_)p5zPQ212ioRM-*552DRcbu*sEtpTSNJ)dt(y8IgtT.

[GPL-3.0+]: ./LICENSE
[issues-url]: https://github.com/potherca/faq.exchange/issues/new
[License Badge]: https://img.shields.io/badge/License-GPL--3.0%2B-lightgray.svg
[Potherca]: https://pother.ca/
[Project Stage Badge: Development]: https://img.shields.io/badge/Project%20Stage-Development-yellowgreen.svg
[Project Stage Page]: https://bl.ocks.org/potherca/raw/a2ae67caa3863a299ba0/
[state-of-phpunit]: https://www.phpnw.org.uk/talk/the-state-of-phpunit/
[volker-dusch]: https://twitter.com/__edorian
