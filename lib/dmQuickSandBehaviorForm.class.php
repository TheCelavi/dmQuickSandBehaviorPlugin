<?php
/**
 * @author TheCelavi
 */
class dmQuickSandBehaviorForm extends dmBehaviorBaseForm {
    
    protected $adjustHeight = array(
        'auto' => 'Auto',
        'dynamic' => 'Dynamic',
        'fixed' => 'Fixed'
    );

    protected $theme = array(
        'default' => 'Default'
    );

    public function configure() {
        
        $this->widgetSchema['inner_target'] = new sfWidgetFormInputText();
        $this->validatorSchema['inner_target'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['theme'] = new sfWidgetFormChoice(array(
            'choices' => $this->getI18n()->translateArray($this->theme)
        ));
        $this->validatorSchema['theme'] = new sfValidatorChoice(array(
            'choices' => array_keys($this->theme)
        ));
        
        $this->widgetSchema['all_items_label'] = new sfWidgetFormInputText();
        $this->validatorSchema['all_items_label'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['easing'] = new dmWidgetFormChoiceEasing();
        $this->validatorSchema['easing'] = new dmValidatorChoiceEasing(array(
            'required' => true
        ));
        
        $this->widgetSchema['duration'] = new sfWidgetFormInputText();
        $this->validatorSchema['duration'] = new sfValidatorInteger(array(
            'min'=>0
        )); 
        
        $this->widgetSchema['useScaling'] = new sfWidgetFormInputCheckbox();
        $this->validatorSchema['useScaling'] = new sfValidatorBoolean();
        
        $this->widgetSchema['adjustHeight'] = new sfWidgetFormChoice(array(
            'choices' => $this->getI18n()->translateArray($this->adjustHeight)
        ));
        $this->validatorSchema['adjustHeight'] = new sfValidatorChoice(array(
            'choices' => array_keys($this->adjustHeight)
        ));
        
        $this->getWidgetSchema()->setLabels(array(
            'all_items_label' => 'Label for remove filter',
            'useScaling' => 'Use scaling effect',
            'adjustHeight' => 'Adjust height of container'
        ));
        
        if (!$this->getDefault('theme')) $this->setDefault ('theme', 'default');
        if (!$this->getDefault('all_items_label')) $this->setDefault ('all_items_label', $this->__('Show all'));
        if (!$this->getDefault('easing')) $this->setDefault ('easing', 'easeInOutQuad');
        if (!$this->getDefault('duration')) $this->setDefault ('duration', 750);
        if (!$this->getDefault('useScaling')) $this->setDefault ('useScaling', true);
        if (!$this->getDefault('adjustHeight')) $this->setDefault ('adjustHeight', 'auto');
        
        parent::configure();
    }
    
}

