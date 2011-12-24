(function($) {    
    
    var methods = {        
        init: function(behavior) {                       
            var $this = $(this), data = $this.data('dmQuickSandMetadata');
            if (data && behavior.dm_behavior_id != data.dm_behavior_id) { // There is attached the same, so we must report it
                alert('You can not attach QuickSand metadata to same content'); // TODO TheCelavi - adminsitration mechanizm for this? Reporting error
            };
            $this.data('dmQuickSandMetadata', behavior);
        },
        
        start: function(behavior) {  
            var $this = $(this);
            $this.attr('data-quicksandid', behavior.dm_behavior_id);
            $.each(behavior.group_names, function(){
                $this.attr('data-quicksandgroup-' + this.group_id , this.group_name);
            });
        },
        stop: function(behavior) {
            var $this = $(this);
            $this.removeAttr('data-quicksandid');
            $.each(behavior.group_names, function(){
                $this.removeAttr('data-quicksandgroup-' + this.group_id);
            });      
        },
        destroy: function(behavior) {            
            var $this = $(this);
            $this.data('dmQuickSandMetadata', null);
        }
    }
    
    $.fn.dmQuickSandMetadata = function(method, behavior){
        
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
        dmQuickSandMetadataBehavior: {
            init: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior) + ' ' + behavior.inner_target).dmQuickSandMetadata('init', behavior);
            },
            start: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior) + ' ' + behavior.inner_target).dmQuickSandMetadata('start', behavior);
            },
            stop: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior) + ' ' + behavior.inner_target).dmQuickSandMetadata('stop', behavior);
            },
            destroy: function(behavior) {
                $($.dm.behaviorsManager.getCssXPath(behavior) + ' ' + behavior.inner_target).dmQuickSandMetadata('destroy', behavior);
            }
        }
    });
    
})(jQuery);