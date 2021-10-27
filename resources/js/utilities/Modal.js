class Modal{
    constructor(){
        document.addEventListener( "click", this.events );
    }
    events(event){
        var element = event.target;
        if(element.tagName == 'A' && element.getAttribute('data-ds-element') == 'modal'){
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
            
            this.openModal(collapseArg);
            this.closeModal(collapseArg);
        }
    }
    /*
     * targetID
     * targetClass
     * objectTrigger
     */
    openModal(payload){
        //apply class to body
        document.querySelector(payload.targetID).classList.toggle(payload.targetClass);

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
                document.querySelector(payload.targetID).classList.remove(payload.targetClass);
                this.removeBackdrop(payload);
            });
        });

        // close modal on Bakcdrop Click
        var backdrop = document.querySelectorAll("." + payload.backdropClass);
        backdrop.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                document.querySelector(payload.targetID).classList.remove(payload.targetClass);
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