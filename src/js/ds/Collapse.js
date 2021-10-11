import JSUTIL from '@andresclua/jsutil/src/js_helper';
class Collapse{
    constructor(){
        this.selector = document.querySelectorAll('[data-ds-element="collapse"]');
        this.js_ui = new JSUTIL();
        this.events();
    }
    events(){
        //loop all elements with ata-ds-element="collapse"]
        this.selector.forEach(element => {
            // add event to all of those elements
            element.addEventListener('click', event => {
                event.preventDefault(); 
                var collapseArg = {
                    //target
                    targetID:element.getAttribute('data-collapse-id'),
                    targetClass : element.getAttribute('data-target-class'),
                    
                    // element
                    objectId : element,
                    objectClass : element.getAttribute('data-self-class')
                    
                };
                /* @ NEED TO VALIDATE ARGUMENTS AT SOME POINT */
                this.collapseEvent(collapseArg)
            })
        })
    }
    /*
     * targetID
     * targetClass
     * objectTrigger
     */
    collapseEvent(payload){
        //apply class to body
        this.js_ui.toggleClass(document.getElementById(payload.targetID),payload.targetClass)
        
        //apply class to trigger    
        this.js_ui.toggleClass(payload.objectId,payload.objectClass)
    }

}
export default Collapse;   