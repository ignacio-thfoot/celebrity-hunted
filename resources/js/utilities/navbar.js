/**
* General imports
*/
import JSUTIL from '@andresclua/jsutil/src/js_helper';
class Navbar{
    constructor() {
      this.headerActive  = 'b--header-a--is-active';
      this.header = document.querySelector('.js--b--header');

      // menu items
      this.nav = document.querySelector('.b--nav');
      this.navActive = 'b--nav-a--is-active';
      this.navSecActive = 'b--dropdown-menu-a--is-active';
      this.navLinkItemActive = 'b--nav-a__list-group__list-item__link--is-active';
      this.navLink = document.querySelectorAll('.js--toggle-nav');

      this.windowOverlay = document.querySelector('.backdrop-header');
      // this.windowOverlay = document.querySelector('.b--window--overlay');
      this.windowOverlayActive = 'backdrop-header--is-active';

      // search items
      this.search = document.querySelectorAll('.js--search-icon');
      this.searchSearch = document.querySelector(".b--nav-a__list-group__list-item__link__icon--primary");
      this.searchClose = document.querySelector(".b--nav-a__list-group__list-item__link__icon--secondary");
      this.searchNav = document.querySelector(".b--search--nav");
      this.searchSearchAct = "b--nav-a__list-group__list-item__link__icon--primary--is-active";
      this.searchCloseAct = "b--nav-a__list-group__list-item__link__icon--secondary--is-active";
      this.searchPageActive = "b--search--nav--is-active";
      this.searchActive = 'b--search--nav--is-active';

      // mobile specific
      this.burgerActive = 'b--burger-a--is-active';
      this.burger = document.querySelector('.b--burger');
      this.burgerClicked = false;
      this.searchClicked = false;
      
      this.triggerSec = document.querySelector('.js--b--dropdown-menu');
      this.triggerSecAll = document.querySelectorAll('.js--b--dropdown-menu');

      this.offset = 80;
      this.windowBreakpoint = 1200;
      this.js_ui = new JSUTIL();
      this.events();
    }

    events() {

      this.bool = (this.header.className.match(this.headerActive)) ? true : false ; //chequea si el header ya esta activo

      window.addEventListener('scroll', () => { this.setNavbarClass(); });

      if (this.navLink) {
        for (let i = 0; i < this.navLink.length; i++) {
          this.js_ui.addEventHandler(this.navLink[i], 'click',  (event) => { this.toggleSecondaryNavbar(i); });
        }
      }

      if (this.burger) {
        this.js_ui.addEventHandler(this.burger, 'click', (event) => { this.burgerTrigger(); });
      }

      // if (this.windowOverlay) {
      //   this.js_ui.addEventHandler(this.windowOverlay, 'click', (event) => { this.hideNavbar(); });
      // }

      if(this.search){
        for (let i = 0; i < this.search.length; i++) {
          this.js_ui.addEventHandler(this.search[i], 'click',  (event) => { this.openSearch(i); });
        }
      }

    }

    /**
    * Controls functionality when user clicks on search icon
    */
    openSearch(){
      event.preventDefault();

      this.restartSearch();

      this.searchClicked = true; 

      let windowY;
      if(this.js_ui.is_explorer()){
        windowY = window.pageYOffset;;
      } else {
        windowY = window.scrollY;
      }
      
        if (windowY < this.offset) { //if on top of the page
          if(this.burger.className.match(this.burgerActive)){ //if burger is open when we click on search
            this.js_ui.addClass(this.header, this.headerActive);
            this.js_ui.removeClass(this.burger, this.burgerActive);
            // this.js_ui.removeClass(document.querySelector('.b--search--nav'), this.searchActive);
            this.js_ui.removeClass(this.nav, this.navActive);
          } else {
            if(this.navSecActive){ //if menu is open and you click search
              for (let i = 0; i < this.triggerSecAll.length; i++) {
                this.js_ui.removeClass(this.triggerSecAll[i], this.navSecActive);
              }  
              this.navLink.forEach((nav, index, nodelist) => {
                this.js_ui.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
              });
              // this.js_ui.removeClass(this.windowOverlay, this.windowOverlayActive);
              this.windowOverlay = document.querySelector('.backdrop-header');
              if(this.windowOverlay){
                  this.windowOverlay.remove(); // Removes the div with the 'backdrop-header' id
              }
            } else { //if menu is closed and you click search

              this.js_ui.toggleClass(this.header, this.headerActive);
            }
          }
          this.js_ui.toggleClass(this.searchSearch, this.searchSearchAct);
          this.js_ui.toggleClass(this.searchClose, this.searchCloseAct);
          this.js_ui.toggleClass(this.searchNav, this.searchPageActive);
          this.setNavbarClass();
          document.querySelector("#searchInput").focus();
          
        } else { //if scrolled
          if(this.burger.className.match(this.burgerActive)){
            this.js_ui.removeClass(this.burger, this.burgerActive);
            // this.js_ui.removeClass(document.querySelector('.b--search--nav'), this.searchActive);
            this.js_ui.removeClass(this.nav, this.navActive);
            this.js_ui.addClass(this.searchSearch, this.searchSearchAct);
            this.js_ui.addClass(this.searchClose, this.searchCloseAct);
            this.js_ui.addClass(this.searchNav, this.searchPageActive);
          } else {
            this.burgerClicked = false;
            for (let i = 0; i < this.triggerSecAll.length; i++) {
              this.js_ui.removeClass(this.triggerSecAll[i], this.navSecActive);
            }
            this.navLink.forEach((nav, index, nodelist) => {
              this.js_ui.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
            });
            // this.js_ui.removeClass(this.windowOverlay, this.windowOverlayActive);
            this.windowOverlay = document.querySelector('.backdrop-header');
            if(this.windowOverlay){
              this.windowOverlay.remove(); // Removes the div with the 'b--modal-backdrop-a' id
            }
  
            this.js_ui.toggleClass(this.searchSearch, this.searchSearchAct);
            this.js_ui.toggleClass(this.searchClose, this.searchCloseAct);
            this.js_ui.toggleClass(this.searchNav, this.searchPageActive);
            this.setNavbarClass();
          }
          document.querySelector("#searchInput").focus();
          
        }
        
    }

    /**
    * Restarts the search layout once window is closed
    */
    restartSearch(){

      // if(document.querySelector('.b--search--nav').className.match(this.searchActive)){
      if(false){
        document.querySelector("#searchInput").value = " ";
        if(document.querySelector("#searchResults")){
          document.querySelector("#searchResults").innerHTML = " ";
        }
        if(document.querySelector(".b--message__label")){
          document.querySelector(".b--message__label").innerHTML = " ";
        }
      }
    }

    /**
    * Controls functionality when user clicks on burger menu
    */
    burgerTrigger() {
      event.preventDefault();

      let windowY;
      if(this.js_ui.is_explorer()){
        windowY = window.pageYOffset;;
      } else {
        windowY = window.scrollY;
      }

      this.restartSearch();

      this.burgerClicked = true;

      // if(document.querySelector('.b--search--nav').className.match(this.searchActive)){
      if(false){
        this.searchOpen = true;
        // this.js_ui.removeClass(document.querySelector('.b--search--nav'), this.searchActive);
        this.js_ui.toggleClass(this.burger, this.burgerActive);
        this.js_ui.addClass(this.nav, this.navActive);
        // when we open burger again after search is open, remove the actives
        for (let i = 0; i < this.triggerSecAll.length; i++) {
          this.js_ui.removeClass(this.triggerSecAll[i], this.navSecActive);
        } 
        this.navLink.forEach((nav, index, nodelist) => {
          this.js_ui.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
        });
      }
      else{
        this.searchClicked = false;
        this.js_ui.toggleClass(this.burger, this.burgerActive);
        // this.js_ui.removeClass(document.querySelector('.b--search--nav'), this.searchActive);
        // if(document.querySelector('.b--search--nav').className.match(this.searchActive)){
        if(false){
          this.js_ui.removeClass(this.search, this.searchActive);
        }
        else{ //search is closed when click burger
          
          if(windowY < this.offset){
            if(!this.header.className.match(this.headerActive)){ //when menu is open
              this.js_ui.toggleClass(this.header, this.headerActive);
            }
            if (!this.burger.className.match(this.burgerActive)) { //when menu is closed

              this.navLink.forEach((nav, index, nodelist) => {
                this.js_ui.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
              });
              this.triggerSecAll.forEach((obj, index, nodelist) => {
                this.js_ui.removeClass(obj, this.navSecActive);
              });
              // this.js_ui.removeClass(this.windowOverlay, this.windowOverlayActive);
              this.windowOverlay = document.querySelector('.backdrop-header');
              if(this.windowOverlay){
                this.windowOverlay.remove(); // Removes the div with the 'backdrop-header' id
              }
              this.js_ui.removeClass(this.header, this.headerActive);
              
            } 
          } else {

            if(this.nav.className.match(this.navActive)){
              this.setNavbarClass();
              
              setTimeout(() => {
                // this.js_ui.removeClass(this.windowOverlay, this.windowOverlayActive);
                this.windowOverlay = document.querySelector('.backdrop-header');
                if(this.windowOverlay){
                  this.windowOverlay.remove(); // Removes the div with the 'backdrop-header' id
                }
                this.triggerSecAll.forEach((obj, index, nodelist) => {
                  this.js_ui.removeClass(obj, this.navSecActive);
                });
                this.navLink.forEach((nav, index, nodelist) => {
                  this.js_ui.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
                });
                this.js_ui.removeClass(this.searchSearch, this.searchSearchAct);
              }, 100);
            }
          }

          this.js_ui.toggleClass(this.nav, this.navActive);
        }
      }
    }
    
    /**
    * Controls the styling of the header in every situation
    */
    setNavbarClass() {
      if(!this.bool) {
        let windowY;
        if(this.js_ui.is_explorer()){
          windowY = window.pageYOffset;;
        } else {
          windowY = window.scrollY;
        }
        if (windowY < this.offset) { //when on top
          if(!this.burger.className.match(this.burgerActive) && !this.header.className.match(this.headerActive)){
            this.js_ui.removeClass(this.header, this.headerActive);
          } 
          var navs = document.getElementsByClassName('b--dropdown-menu-a');
          for (var i = 0; i < navs.length; i++) {
            if(navs[i].classList.contains('b--dropdown-menu-a--is-active')){
              this.js_ui.addClass(document.querySelector('.b--header'), this.headerActive);    
            } else {
              // if(document.querySelector('.b--search--nav').className.match('b--search--nav--is-active')){ //if search is open
              if(true){ //if search is open
                this.js_ui.addClass(this.header, this.headerActive);
              } else{ //if search is closed
                if(document.querySelector('.b--dropdown-menu-a--is-active')){
                  this.js_ui.addClass(document.querySelector('.b--header-a'), this.headerActive); 
                } else {
                  this.js_ui.removeClass(document.querySelector('.b--header-a'), this.headerActive);
                }
              }
            }
          };
          if(this.burger.className.match(this.burgerActive)){
            this.js_ui.addClass(this.header, this.headerActive);
          }
        }
        else { //when scrolled - OK
          this.js_ui.addClass(this.header, this.headerActive);
        }
      }
    }

    /**
    * Controls functionality when user clicks on any menu item
    */
    toggleSecondaryNavbar(object) {
      event.preventDefault();

      // this.restartSearch();


      var dataHref = event.target.getAttribute("data-href");
      if(dataHref && dataHref.length > 0){
        var secondary = document.querySelector("#" + dataHref);
        if(secondary.className.match(this.navSecActive)){ //when clicking on same item
          this.navLink.forEach((nav, index, nodelist) => {
            nav.blur();
          });

          if(this.burger.className.match(this.burgerActive)){
            this.navLink.forEach((nav, index, nodelist) => {
              this.js_ui.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
            });
          } else {
            this.setNavbarClass();
          }
          this.tf.removeClass(secondary, this.navSecActive);
          // this.tf.removeClass(this.windowOverlay, this.windowOverlayActive);
          this.windowOverlay = document.querySelector('.backdrop-header');
          if(this.windowOverlay){
            this.windowOverlay.remove(); // Removes the div with the 'b--modal-backdrop-a' id
          }
          this.setNavbarClass();

        }else {  // when opening a new item
          if(this.burger.className.match(this.burgerActive)){
            this.navLink.forEach((nav, index, nodelist) => {
              this.tf.removeClass(nav, 'b--nav-a__list-group__list-item__link--is-active');
            });
            this.tf.addClass(secondary.parentElement.children[0], 'b--nav-a__list-group__list-item__link--is-active');
          }
          this.tf.addClass(secondary, this.navSecActive);
          this.tf.addClass(this.header, this.headerActive);
          // if(!this.windowOverlay.className.match(this.windowOverlayActive)){
          //   this.tf.addClass(this.windowOverlay, this.windowOverlayActive);
          // }
          
          var windowOverlay = document.querySelector(".backdrop-header");
          if (!windowOverlay) {
            var div = document.createElement('div');
            div.setAttribute('class', 'backdrop-header');
            document.body.appendChild(div);
            var windowOverlay = document.querySelector(".backdrop-header");
            this.tf.addEventHandler(windowOverlay, 'click', (event) => { this.hideNavbar(); });
          }

          this.triggerSecAll.forEach((obj, index, nodelist) => {
            var objId  = obj.id;
            if(dataHref != objId){
              this.tf.removeClass(document.querySelector("#" + objId), this.navSecActive);
            }
          });

          //if search is open, then close it
          // if(document.querySelector('.b--search--nav').className.match(this.searchActive)){ 
          if(false){ 
            this.tf.removeClass(this.searchSearch, this.searchSearchAct);
            this.tf.removeClass(this.searchClose, this.searchCloseAct);
            this.tf.removeClass(this.searchNav, this.searchPageActive);
          }
        }
      }

      var test = document.querySelectorAll('.b--nav-a__list-group__list-item__link--is-active');
      if(test && test.length > 0) {
        test.forEach((obj, index, nodelist) => {
          if(!obj.className.match('b--nav-a__list-group__list-item__link--is-active')){
            this.tf.removeClass(obj, 'b--nav-a__list-group__list-item__link--is-active');
          }
        });
      }
    }


    /**
    * Hides the menu when user clicks on the overlay
    */
    hideNavbar() {
        event.preventDefault();
        // this.tf.removeClass(this.windowOverlay, this.windowOverlayActive);
        this.windowOverlay = document.querySelector('.backdrop-header');
        if(this.windowOverlay){
          this.windowOverlay.remove(); // Removes the div with the 'backdrop-header' id
        }
        for (let i = 0; i < this.navLink.length; i++) {
          this.tf.removeClass(this.navLink[i],  this.navLinkItemActive );  
        }
        this.triggerSecAll.forEach((obj, index, nodelist) => {
          var objId  = obj.id;
          this.tf.removeClass(document.querySelector("#" + objId), this.navSecActive);
        });
        this.setNavbarClass();
    }
}
export default Navbar;
