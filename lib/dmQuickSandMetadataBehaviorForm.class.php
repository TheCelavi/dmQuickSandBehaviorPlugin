<?php
/**
 * @author TheCelavi
 */
class dmQuickSandMetadataBehaviorForm extends dmBehaviorBaseForm {
    
    public function configure() {
        $this->widgetSchema['inner_target'] = new sfWidgetFormInputText();
        $this->validatorSchema['inner_target'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['group_names'] = new sfWidgetFormInputText();
        $this->validatorSchema['group_names'] = new sfValidatorString(array(
            'required' => true
        ));
        
        $this->getWidgetSchema()->setHelps(array(
            'group_names' => 'You can set several group names separating them with semicolon (;)'
        ));
        
        parent::configure();
    }
    
}

