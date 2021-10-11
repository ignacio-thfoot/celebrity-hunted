import JSUTIL from '@andresclua/jsutil/src/js_helper';
class Modal{
    constructor(){
        this.modal = document.querySelectorAll('[data-ds-element="modal"]');
        this.js_ui = new JSUTIL();
        this.events();
    }
    events(){
        //loop all elements with ata-ds-element="collapse"]
        this.modal.forEach(element => {
            // add event to all of those elements
            element.addEventListener('click', event => {
                event.preventDefault(); 
                var collapseArg = {
                    //target
                    targetID: element.getAttribute('data-target'),
                    targetClass : element.getAttribute('data-target-class'),
                    
                    // element
                    objectId : element,
                    objectClass : element.getAttribute('data-self-class'),

                    // backdrop
                    backdropClass : element.getAttribute('data-backdrop'),
                    
                };
                /* @ NEED TO VALIDATE ARGUMENTS AT SOME POINT */
                this.openModal(collapseArg);
                this.closeModal(collapseArg);
            })
        })
    }
    /*
     * targetID
     * targetClass
     * objectTrigger
     */
    openModal(payload){
        //apply class to body
        this.js_ui.toggleClass(document.querySelector(payload.targetID),payload.targetClass);

        //create Backdrop div with class
        var div = document.createElement('div');
        div.className = payload.backdropClass;
        document.body.appendChild(div);
    }
    // Closes Modal
    closeModal(payload){
        // close modal on X
        var closeBtn = document.querySelectorAll('[data-dismiss]');
        closeBtn.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                this.js_ui.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
            });
        });

        // close modal on Bakcdrop Click
        var backdrop = document.querySelectorAll("." + payload.backdropClass);
        backdrop.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                this.js_ui.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
            });
        });
    }
    // removes backdrop HTML
    removeBackdrop (payload){
        if(document.querySelector('.' + payload.backdropClass)){
            var div = document.querySelector('.' + payload.backdropClass);
            div.parentNode.removeChild(div);
        }
    }

}
export default Modal;   