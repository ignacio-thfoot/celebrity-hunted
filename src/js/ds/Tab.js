import JSUTIL from '@andresclua/jsutil/src/js_helper';
class Tab{
    constructor(){
        this.tabs = document.querySelectorAll('[data-ds-element="tabs"]');
        this.js_ui = new JSUTIL();
        this.events()
    }
    events(){
        this.tabs.forEach(element => {
            var accordiongSettings = {
                //anchor triggers
                triggers: element.querySelectorAll('[data-tab-to-open]'),
                //active class to "nav"
                listItemActive : element.getAttribute('data-list-item-active'),
                //active class to div to show
                tabActive : element.getAttribute('data-tab-active-class'),
                // default open tab ID
                tabId: element.getAttribute('data-tab-active-id')
            };
            this.asambleAccordion(accordiongSettings);
        });
    }


    asambleAccordion(props){
        // Add active class to Default Link and Body Items
        this.js_ui.addClass(document.getElementById(props.tabId),props.tabActive);
        this.js_ui.addClass(document.querySelector("[data-tab-to-open = " + props.tabId),props.listItemActive);

        // Triggers click event 
        props.triggers.forEach((element)=>{
            element.addEventListener('click', (item)=>{
                item.preventDefault();
                // Hides all active classes
                this.hideAllTabs(props);
                // apply class to trigger 
                this.js_ui.toggleClass(element,props.listItemActive);
                // apply class to body   
                var bodyelement = element.getAttribute('data-tab-to-open');
                this.js_ui.toggleClass(document.getElementById(bodyelement),props.tabActive);
            })
        })
    }
    // Hides all active clases
    hideAllTabs(props){
        // removes class to body
        document.querySelectorAll('[data-tab-body]').forEach((element)=>{
            this.js_ui.removeClass(element,props.tabActive)
        });
        // removes class to trigger 
        document.querySelectorAll('[data-tab-to-open]').forEach((element)=>{
            this.js_ui.removeClass(element,props.listItemActive)
        });
    }
}


export default Tab;   