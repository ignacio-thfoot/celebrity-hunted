import JSUTIL from '@andresclua/jsutil/src/js_helper';
class CollapseB {
    constructor(){
        this.selector = document.querySelectorAll('[data-ds-element="collapse-b"]');
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
                    targetID: element.getAttribute('data-collapse-id'),
                    targetClass : element.getAttribute('data-target-class'),
                    
                    // element
                    objectId : element,
                    objectClass : element.getAttribute('data-self-class'),
                };
                /* @ NEED TO VALIDATE ARGUMENTS AT SOME POINT */
                this.openEvent(collapseArg);
                this.closeEvent(collapseArg);
            });
        })
    }
    /*
     * targetID
     * targetClass
     * objectTrigger
     */
    openEvent(payload){
        //apply class to body
        this.js_ui.addClass(document.getElementById(payload.targetID),payload.targetClass)
        
        //apply class to trigger 
        payload.objectId.classList.add(payload.objectClass);
    }

    closeEvent(payload){
        document.getElementById(payload.targetID).addEventListener("click", (event) => {
            if(event.target.tagName.toLowerCase() === 'a'){
                // do nothing
            }else{
                // close collapse
                event.preventDefault();
                payload.objectId.classList.remove(payload.objectClass);
                this.js_ui.removeClass(document.getElementById(payload.targetID),payload.targetClass)
            }
        });
    }
}
export default CollapseB;   