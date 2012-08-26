<?php
/**
 * @author TheCelavi
 */
class dmQuickSandBehaviorView extends dmBehaviorBaseView {
    
    public function configure() {
        $this->addRequiredVar(array('theme', 'easing', 'duration', 'useScaling', 'adjustHeight'));
    }
    
    public function filterBehaviorVars(array $vars = array()) {
        $vars = parent::filterBehaviorVars($vars);
        $vars['all_items_label'] = (isset ($vars['all_items_label']) && trim($vars['all_items_label'])) ? $vars['all_items_label'] : false;        
        if (isset ($vars['adjustHeight'])) {
            if ($vars['adjustHeight'] == 'fixed') $vars['adjustHeight'] = false;
        } else $vars['adjustHeight'] = 'auto';
        return $vars;
    }
    
    public function getJavascripts() {
        return array_merge(
            parent::getJavascripts(),
            array(
                'lib.easing',
                'dmQuickSandBehaviorPlugin.transform',
                'dmQuickSandBehaviorPlugin.patch',
                'dmQuickSandBehaviorPlugin.quickSand',
                'dmQuickSandBehaviorPlugin.launchQuickSand'
            )
        );
    }
    
    public function getStylesheets() {
        return array_merge(
            parent::getStylesheets(),
            array(
                'dmQuickSandBehaviorPlugin.themes'
            )
        );
    }
    
}

