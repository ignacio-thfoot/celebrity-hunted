//CSS
import './../scss/entries/home.scss';
import Blazy from 'blazy';
import axios from 'axios';
import data from './../data/data.json';

//ssh -i KeyPairAmazon.pem ec2-user@15.188.207.187


class Home {
    constructor(){
        this.init();
        this.rotate = document.querySelector('.b--rotate-a'); //rotate window
    }

    init(){
        new Blazy({ 
            selector: '.b--lazy-a',
            successClass: 'b--lazy-a--fade-in',
        });
        
        this.loadTextData();

        document.addEventListener("loaded", (e) => {
            setTimeout(() => {
                this.hideKrpanoButtons();
                this.hidePreloader();
                this.events();
            }, 5);            
        });
        
        window.selectedTeams = [];
        window.email = '';
        window.emailExists = [];

        this.preloadImages([
            'skin/assets/team1_found.png',
            'skin/assets/team2_found.png',
            'skin/assets/team3_found.png',
            'skin/assets/team4_found.png'
        ]);

    }

    preloadImages (images) {
        try {
            images.forEach((image) => {
                var _img = new Image();
                _img.src = image;
            });
        } catch (e) { }
    }

    loadTextData() {
        var textElements = document.querySelectorAll("[data-text]");

        textElements.forEach((el) => {
            el.innerHTML = data.text[el.getAttribute("data-text")];
        });
    }

    hidePreloader() {
        let preloader = document.querySelector(".b--preloader-a");
        preloader.classList.remove("b--preloader-a--is-active");
    }

    showSignupForm(team) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === team;
        });
        
        let totalSeconds = result[0].totalSeconds;
        let content = document.querySelector("#modal-inscription .b--card-c__front-items__bd__content");
        content.innerHTML = content.innerHTML.replace("{team_name}", data.teams[team])
        .replace("{time}", this.showPrettyTime(totalSeconds))
        .replace("{average}", this.showPrettyTime(result[0].teamAverage));
        
        this.openModal('modal-inscription');
        this.closeModal('modal-inscription');
    }

    showAlreadySignedForm(team) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === team;
        });
        
        let totalSeconds = result[0].totalSeconds;
        let content = document.querySelector("#modal-inscription-2 .b--card-c__front-items__bd__content");
        content.innerHTML = content.innerHTML.replace("{team_name}", data.teams[team])
        .replace("{time}", this.showPrettyTime(totalSeconds))
        .replace("{average}", this.showPrettyTime(result[0].teamAverage));
        
        this.openModal('modal-inscription-2');
        this.closeModal('modal-inscription-2');
    }

    hideSignupForm() {
        document.querySelector("#modal-inscription .close-modal").click();
    }

    showShareModal() {
        this.openModal("modal-share");
        this.closeModal("modal-share");
    }

    hideShareModal() {
        document.querySelector("#modal-share").classList.remove("b--card-c--is-visible");
    }

    goFullscreen(){
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
    }

    events() {
        //home start button
        document.querySelector("#modal-home .b--card-c__front-items__bd__btn").addEventListener("click", () =>  {
            this.goFullscreen();
            document.querySelector("#modal-home").classList.remove("b--card-c--is-visible");
            this.showKrpanoButtons();
            this.startTimer();
        });

        //team pics
        document.querySelectorAll(".team_hotspots").forEach((hotspot) => {
            hotspot.addEventListener("click", this.hotspotClickHandler.bind(this));
        });

        //inscription
        document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click", () => {
            document.querySelector(".b--card-c").classList.remove("b--card-c--is-visible");
            this.startTimer();
        });
        document.querySelector("#modal-inscription .b--card-c__front-items__bd__input__icon").addEventListener("click", () => {
            this.registerEmail();
        });
        document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click", () => {
            document.querySelector("#modal-inscription").classList.remove("b--card-c--is-visible");
        });

        //trailer
        document.querySelector("#button_trailer").addEventListener("click", () => {
            this.openModal("modal-trailer");
            this.closeModal("modal-trailer");
        });
        

        //about - help
        document.querySelector("#about").addEventListener("click", (e) => {
            e.preventDefault();
            this.showHelpModal();
        });
        document.querySelector("[data-text='welcome_more']").addEventListener("click", (e) => {
            e.preventDefault();
            this.showHelpModal();
        });

        //rotate
        window.mobilecheck = () => {
            var check = false;
            ((a) => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
    
        //check rotate
        if(window.mobilecheck() == true){
            if(screen.orientation.angle == 90){
                this.rotate.classList.add("b--rotate-a--is-visible");
            }
            window.addEventListener('orientationchange', this.checkOrientationChange.bind(this));
        }
    }

    showErrorModal() {
        this.openModal('modal-error');
        this.closeModal('modal-error');
    }

    showHelpModal() {
        this.openModal('modal-help');
        this.closeModal('modal-help');
    }

    startTimer() {
        let d = performance.now();
        window.startTime = d;
    }

    registerEmail() {
        var email = document.querySelector("#modal-inscription .b--card-c__front-items__bd__input").value;
        if (this.validateEmail(email)) {
            this.emailExists(email);
            if(window.emailExists.length == 0) {
                this.createParticipant(email, 'game');
            } else {
                this.showErrorModal();
            }
        } else {
            alert("E-Mail pas correct.");
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkOrientationChange(){
        let screenOrientation = screen.orientation.angle;
        if(screenOrientation == 0){
            this.rotate.classList.remove("b--rotate-a--is-visible")
        } else {
            this.rotate.classList.add("b--rotate-a--is-visible")
        }
    }

    hotspotClickHandler(e){
        this.findHotSpot(e.srcElement);
    }

    hideKrpanoButtons() {
        $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast", 0);
    }

    showKrpanoButtons() {
        $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast", 1);
    }

    findHotSpot(hotspot) {

        var result = window.selectedTeams.filter(obj => {
            return obj.team === hotspot.id;
        });

        if(result.length == 0) {
            var stopTime = performance.now();
            let team_button = document.getElementById(hotspot.id + "_button");
            team_button.classList.add("is--active");
            var time = Math.round((stopTime - window.startTime) / 1000);
            
            window.selectedTeams.push({
                "team" : hotspot.id,
                "startTime" : window.startTime,
                "stopTime" : stopTime,
                "totalSeconds" : time
            });

            this.createScore(hotspot.id, time);
        } else {
            this.showAlreadySignedForm(hotspot.id);
        }
    }

    showPrettyTime(totalSeconds) {
        
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        if(totalSeconds > 59) {
            return minutes + ':' + seconds + 'MN';
        } else {
            return seconds + 'S';
        }

        
    }

    createParticipant(email, type) {
        //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://127.0.0.1:8000/
        let host = 'https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        axios.post(host + 'api/participants',{
            'email': email,
            'type' : type
        })
        .then((res) => {
            // console.log("RESPONSE", res);
            this.hideSignupForm();
            this.showShareModal();
            window.email = email;
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    createScore(team, timePassed) {
        //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://127.0.0.1:8000/
        let host = 'https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        axios.post(host + 'api/scores',{
            'teamName':team,
            'timePassed' : timePassed,
        })
        .then((res) => {
            // console.log("RESPONSE", res);

            var result = window.selectedTeams.filter(obj => {
                return obj.team === res.data.teamName;
            });

            result[0].teamAverage = res.data.avg;

            this.showSignupForm(res.data.teamName);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    emailExists(email) {
        //participants/{email}
        //http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://127.0.0.1:8000/
        let host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        axios.get(host + 'api/participants/' + email)
        .then((res) => {
            console.log("RESPONSE", res);
            window.emailExists = res.data;
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }
    
    // MODAL

    /*
    * targetID
    * targetClass
    * objectTrigger
    */
    openModal(id){
        //apply class to body
        let payload = {
            'targetID' : '#' + id,
            'objectClass' : 'b--card-c',
            'backdropClass' : 'b--modal-backdrop-a',
            'targetClass' : 'b--card-c--is-visible'
        }
        this.toggleClass(document.querySelector(payload.targetID),payload.targetClass);

        //create Backdrop div with class
        var div = document.createElement('div');
        div.className = payload.backdropClass;
        document.body.appendChild(div);
    }
    // Closes Modal
    closeModal(id){
        // close modal on X
        //apply class to body
        let payload = {
            'targetID' : '#' + id,
            'objectClass' : 'b--card-c',
            'backdropClass' : 'b--modal-backdrop-a',
            'targetClass' : 'b--card-c--is-visible'
        }
        var closeBtn = document.querySelectorAll('.close-modal');
        closeBtn.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                this.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
                this.loadTextData();
                this.startTimer();
            });
        });

        // close modal on Bakcdrop Click
        var backdrop = document.querySelectorAll("." + payload.backdropClass);
        backdrop.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                this.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
                this.loadTextData();
                this.startTimer();
            });
        });
    }

//toggleClass
    //ToggleClass('class')
    toggleClass(sel, c1, c2) {
        this._toggleClassElements(this._getElements(sel), c1, c2);
    };
    _toggleClassElements(elements, c1, c2) {
        var i, l = elements.length;
        for (i = 0; i < l; i++) {    
            this._toggleClassElement(elements[i], c1, c2);
        }
    };
    _toggleClassElement (element, c1, c2) {
        var t1, t2, t1Arr, t2Arr, j, arr, allPresent;
        t1 = (c1 || "");
        t2 = (c2 || "");
        t1Arr = t1.split(" ");
        t2Arr = t2.split(" ");
        arr = element.className.split(" ");
        if (t2Arr.length == 0) {
          allPresent = true;
          for (j = 0; j < t1Arr.length; j++) {
            if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
          }
          if (allPresent) {
            this._removeClassElement(element, t1);
          } else {
            this._addClassElement(element, t1);
          }
        } else {
          allPresent = true;
          for (j = 0; j < t1Arr.length; j++) {
            if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
          }
          if (allPresent) {
            this._removeClassElement(element, t1);
            this._addClassElement(element, t2);          
          } else {
            this._removeClassElement(element, t2);        
            this._addClassElement(element, t1);
          }
        }
    };

    // removes backdrop HTML
    removeBackdrop (payload){
        if(document.querySelector('.' + payload.backdropClass)){
            var div = document.querySelector('.' + payload.backdropClass);
            div.parentNode.removeChild(div);
        }
    }

    //removeClass(selector,'class')
    removeClass(sel, name) {
        this._removeClassElements(this._getElements(sel), name);
    };
    _removeClassElements(elements, name) {
        var i, l = elements.length, arr1, arr2, j;
        for (i = 0; i < l; i++) {
          this._removeClassElement(elements[i], name);
        }
    };
    _removeClassElement  (element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
          while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
          }
        }
        element.className = arr1.join(" ");
    };

    _getElements(id) {
        if (typeof id == "object") {
          return [id];
        } else {
          return document.querySelectorAll(id);
        }
    };

    _addClassElement (element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
          if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
        }
    };

}

export default Home;
new Home();