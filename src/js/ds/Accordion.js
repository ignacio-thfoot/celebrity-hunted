import JSUTIL from '@andresclua/jsutil/src/js_helper';
class Accordion {
    constructor(){
        this.accordion = document.querySelectorAll('[data-ds-element="accordion"]');
        this.js_ui = new JSUTIL();
        this.events()
    }
    events(){
        this.accordion.forEach(element => {
            var accordiongSettings = {
                //anchor triggers
                triggers: element.querySelectorAll('[data-target]'),
                //active class to "nav"
                itemClass : element.getAttribute('data-target-class'),
                //active class to div to show
                itemACtiveClass : element.getAttribute('data-target-class-active'),
                // default open tab ID
                accordionId: element.getAttribute('data-accordion-active-id'),
                // can close the actual active
                close: element.getAttribute('data-close')
            };
            this.asambleAccordion(accordiongSettings)
        });
    }

    asambleAccordion(props){

        // Add active class to Default Link and Body Items
        this.js_ui.addClass(document.getElementById(props.accordionId),props.itemACtiveClass);

        props.triggers.forEach((element)=>{
            element.addEventListener('click', (item)=>{
                item.preventDefault();
                var bodyelement = element.getAttribute('data-target');
                var bodyelement = document.getElementById(bodyelement);
                if(props.close == 'true'){
                    if(bodyelement.classList.contains(props.itemACtiveClass)){
                        this.js_ui.toggleClass(bodyelement,props.itemACtiveClass);
                        this.hideAllTabsExceptActual(bodyelement,props);
                    }else{
                        this.hideAllTabs(props);
                        this.js_ui.toggleClass(bodyelement,props.itemACtiveClass);
                    }
                }else{
                    this.hideAllTabs(props);
                    //apply class to element   
                    this.js_ui.toggleClass(bodyelement,props.itemACtiveClass);
                }
                
            })
        })
    }

    hideAllTabs(props){
        //removes class element
        document.querySelectorAll('[data-tab-body]').forEach((element)=>{
            this.js_ui.removeClass(element,props.itemACtiveClass)
        });
        
    }
    hideAllTabsExceptActual(bodyelement,props){
        //removes class element except actual
        document.querySelectorAll('[data-tab-body]').forEach((element)=>{
            if(element.getAttribute('data-tab-body') != bodyelement){
                this.js_ui.removeClass(element,props.itemACtiveClass)
            }
        });
        
    }
}

export default Accordion;   