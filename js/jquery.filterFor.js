(function($) {
    var settings;
    $.fn.extend({
        filterFor: function(listSelector, options) {
            settings = $.extend({
                 'caseSensitive' : false
               // The list with keys to skip (esc, arrows, return, etc)
               // 8 is backspace, removed for better usability
               , keys : [13, 27, 32, 37, 38, 39, 40 /*,8*/ ]
               //@TODO:use if set? , 'map' : {}
               }, options)
               , self = this
               , $titles = $(listSelector)
               , cache = {}
           ;

           if ($titles.length !== 0) {
               if(!$titles.is('ul,ol')){
                  $titles = $titles.find('ul,ol');
               }

               $titles = $titles.find('li');
               $titles.each(function(index, node) {
                   var   $node = $(node)
                       , text = $node.text()
                   ;
                   if (typeof cache[text] !== 'undefined') {
                       // Another item with exactly the same text already exists
                       cache[text] = cache[text].add($node);
                   } else {
                       cache[text] = $node;
                   }
               });

               this.each(function(index, element) {
                   var $element = $(element);
                   $element.keyup(function(e) {
                        if ($.inArray(e.keyCode, settings.keys) === -1) {
                            var val = $element.val().toLowerCase();
                            $.each(cache, function(text, $node) {
                                var id = $node.find('a').attr('href');
                                $linkedNode = $(id);
                                if((text + '').indexOf(val) === -1) {
                                    $node.hide();
                                    $linkedNode.hide();
                                } else {
                                    $node.show();
                                    $linkedNode.show();
                                }
                           });
                       }
                   });
               });
           }

           return this;
       }
   });
}(jQuery));
