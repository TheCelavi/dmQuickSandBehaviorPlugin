<?php
/**
 * @author TheCelavi
 */
class dmQuickSandMetadataBehaviorView extends dmBehaviorBaseView {
    
    public function configure() {
        $this->addRequiredVar(array('group_names'));
    }

    protected function filterBehaviorVars(array $vars = array()) {
        $vars = parent::filterBehaviorVars($vars);
        if (isset($vars['group_names'])) {
            $vars['group_names'] = explode(';', $vars['group_names']);
            foreach ($vars['group_names'] as &$group) {
                $group = array(
                    'group_id' => dmString::slugify($group),
                    'group_name' => trim($group)
                );
            }
        } else $vars['group_names'] = array();
        return $vars;
    }
    
    public function getJavascripts() {
        return array_merge(
            parent::getJavascripts(),            
            array(
                'dmQuickSandBehaviorPlugin.launchMetadata'
            )
        );
    } 
}

