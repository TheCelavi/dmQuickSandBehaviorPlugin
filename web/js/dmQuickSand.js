(function($) {    
    
    var methods = {        
        init: function(behavior) {                       
            var $this = $(this), data = $this.data('dmQuickSandBehavior');
            if (data && behavior.dm_behavior_id != data.dm_behavior_id) { // There is attached the same, so we must report it
                alert('You can not attach QuickSand to same content'); // TODO TheCelavi - adminsitration mechanizm for this? Reporting error
            };
            $this.data('dmQuickSandBehavior', behavior);
        },
        
        start: function(behavior) {  
            var $this = $(this), $navigaton = $('<div class="dmQuickNavigation"></div>');
            if ($this.is('ul')) {
                // TODO? What if we are manipulating with ul?
            }
            var $copy = $this.children().clone(true, true);
            $this.data('dmQuickSandBehaviorPreviousDOM', $this.children().detach());
            $this.append($('<div class="dmQuickSandContainer"></div>').append($copy));
            var groups = {};
            $.each($copy, function(){
                var $item = $(this);
                for (var i = 0; i<$item[0].attributes.length; i++) {
                    var attrName = $item[0].attributes[i].nodeName;
                    if (/data-quicksandgroup-*/im.test(attrName)) {
                        groups[$item[0].attributes[i].nodeName] = $item[0].attributes[i].nodeValue;
                    }
                }
            });            
            $this.prepend($navigaton);
            
            var $current = $this.find('.dmQuickSandContainer');
            var $originalSource = $current.clone(true, true);
            
            
            for (var key in groups) {
                var $link = $('<a href="#"></a>').html(groups[key]).attr('rel', key).click(function(){
                    $navigaton.find('a').removeClass('selected');
                    $(this).addClass('selected');
                    var $filtered = $originalSource.clone(true, true);
                    $filtered.addClass('hidden');                    
                    $('body').append($filtered);
                    $current.quicksand($filtered.children().filter('['+ $(this).attr('rel') +']'), behavior);
                    $filtered.remove();
                    return false;
                });
                $navigaton.append($link);
            }
            if (behavior.all_items_label) {
                var $all = $('<a href="#"></a>').html(behavior.all_items_label).click(function(){
                    $navigaton.find('a').removeClass('selected');
                    $(this).addClass('selected');
                    var $all = $originalSource.clone(true, true);
                    $all.addClass('hidden');
                    $('body').append($all);
                    $current.quicksand($all.children(), behavior);
                    $all.remove();
                    return false;
                });
                $navigaton.prepend($all);
            }
            $navigaton.find('a:first').addClass('first').addClass('selected');
            $navigaton.find('a:last').addClass('last');
        },
        stop: function(behavior) {
            var $this = $(this);
            $this.empty().append($this.data('dmQuickSandBehaviorPreviousDOM'));
        },
        destroy: function(behavior) {            
            var $this = $(this);
            $this.data('dmQuickSandBehavior', null);
            $this.data('dmQuickSandBehaviorPreviousDOM', null);
        }
    }
    
    $.fn.dmQuickSandBehavior = function(method, behavior){
        
        return this.each(function() {
            if ( methods[method] ) {
                return methods[ method ].apply( this, [behavior]);
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, [method] );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.dmQuickSandMetadata' );
            }  
        });
    };

    $.extend($.dm.behaviors, {        
        dmQuickSandBehavior: {
            init: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmQuickSandBehavior('init', behavior);
            },
            start: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmQuickSandBehavior('start', behavior);
            },
            stop: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmQuickSandBehavior('stop', behavior);
            },
            destroy: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior, true) + ' ' + behavior.inner_target).dmQuickSandBehavior('destroy', behavior);
            }
        }
    });
    
})(jQuery);