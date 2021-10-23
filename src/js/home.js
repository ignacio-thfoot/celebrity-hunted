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
        //rotate
    }

    init(){
        new Blazy({ 
            selector: '.b--lazy-a',
            successClass: 'b--lazy-a--fade-in',
        });
        
        this.loadTextData();

        document.addEventListener("loaded", (e) => {
            this.hideKrpanoButtons();

            this.krpano = document.getElementById("krpanoSWFObject");

            //this.showErrorModal();
            // this.simulateTeam("team1");
            // this.showSignupForm("team1");

            this.events();
            this.showMobileHeader();
            this.hidePreloader(); 
            this.playSound();
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

    playSound() {
        var myAudio = new Audio('img/loop.ogg'); 
        myAudio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
        myAudio.play();
        myAudio.volume = .1;
    }

    mobileCheck() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
        
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    showMobileHeader() {
        if(this.mobileCheck() == true) {
            let header = document.querySelector(".b--card-c__front-items__hd__media");
            header.style.top = window.header_y;
            header.style.left = window.header_x;
            header.style.width = window.header_width;
            header.style.height = window.header_height;
        }
    }

    simulateTeam() {
        window.selectedTeams[0] = {
            team: "team1",
            start: 22222,
            stop: 22222,
            totalSeconds: 30,
            teamAverage: 30
        }
    }

    preloadImages (images) {
        try {
            images.forEach((image) => {
                var _img = new Image();
                _img.src = image;
            });
        } catch (e) { }
    }

    /*  
    krpano.call("show_teams()");
    krpano.call("hide_teams()");
    */

    loadTextData() {
        var textElements = document.querySelectorAll("[data-text]");

        textElements.forEach((el) => {
            el.innerHTML = data.text[el.getAttribute("data-text")];
        });
    }

    hidePreloader() {
        let preloader = document.querySelector(".b--preloader-a");
        preloader.classList.remove("b--preloader-a--is-active");
        const video = document.querySelector(".b--preloader-a video");
        video.pause();
        video.currentTime = 0;
    }

    showSignupForm(team) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === team;
        });
        
        let totalSeconds = result[0].totalSeconds;
        let teamAverage = result[0].teamAverage;
        let content = document.querySelector("#modal-inscription .b--card-c__front-items__bd__content");
        content.innerHTML = content.innerHTML.replace("{team_name}", data.teams[team])
        .replace("{time}", this.showPrettyTime(totalSeconds))
        .replace("{average}", this.showPrettyTime(teamAverage));
        
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

    toggleFullscreen(event) {
        var element = document.body;
      
          if (event instanceof HTMLElement) {
              element = event;
          }
      
          var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
      
          element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
          document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };
      
          let fullscreen_button = document.querySelector("#fullscreen");
          fullscreen_button.classList.toggle("fullscreen-back");

          isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
      }

    events() {
        //home start button
        document.querySelector("#modal-home .b--card-c__front-items__bd__btn").addEventListener("click", (e) =>  {
            this.toggleFullscreen(e);
            document.querySelector("#modal-home").classList.remove("b--card-c--is-visible");
            this.showKrpanoButtons();
            this.startTimer();
        });

        document.querySelector("#fullscreen").addEventListener("click", (e) => {
            this.toggleFullscreen(e);
        });

        //team pics
        ["team1", "team2", "team3", "team4"].forEach((e) => {
            document.addEventListener(e, this.hotspotClickHandler.bind(this));
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
        document.addEventListener("button_trailer", () => {
            this.showTrailer();
        });
        

        //about - help
        document.addEventListener("about", (e) => {
            console.log("yeeeeee");
            this.showHelpModal();
        });

        document.querySelectorAll("[data-text='welcome_more']").forEach((button) => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                this.showHelpModal();
            });
        });

        //check rotate
        if(this.mobileCheck() == true){
            if(screen.orientation.angle == 90){
                this.rotate.classList.add("b--rotate-a--is-visible");
            }
            window.addEventListener('orientationchange', this.checkOrientationChange.bind(this));
        }
    }

    showTrailer() {
        this.openModal("modal-trailer");
        this.closeModal("modal-trailer");
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
        var emailElement = document.querySelector("#modal-inscription .b--card-c__front-items__bd__input");
        var checkboxElement = document.querySelector("#modal-inscription .b--card-c__front-items__ft__checkbox");
        if (!this.validateEmail(emailElement.value)) {
            emailElement.classList.add("error");
            if (!checkboxElement.checked) {
                checkboxElement.classList.add("error");
            } else {
                checkboxElement.classList.remove("error");
            }
        }else if (!checkboxElement.checked) {
            checkboxElement.classList.add("error");
            if(this.validateEmail(emailElement.value)) {
                emailElement.classList.remove("error");
            }
        } else {
            this.emailExists(emailElement.value).then((res) => {
                if(res.data.length == 0) {
                    
                    this.createParticipant(emailElement.value, 'game');
                    window.email = emailElement.value;
                } else {
                    this.hideSignupForm();
                    this.showErrorModal();
                }
                emailElement.value = '';
                checkboxElement.checked = false;          
            });
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
        this.findHotSpot(e.type);
    }

    hideKrpanoButtons() {
        $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast", 0);
    }

    showKrpanoButtons() {
        $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about").fadeTo("fast", 1);
    }

    findHotSpot(hotspot) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === hotspot;
        });

        if(result.length == 0) {
            var stopTime = performance.now();
            var time = Math.round((stopTime - window.startTime) / 1000);
            
            window.selectedTeams.push({
                "team" : hotspot,
                "startTime" : window.startTime,
                "stopTime" : stopTime,
                "totalSeconds" : time
            });

            document.querySelector("#" + hotspot + "_button").classList.add("team-found");


            this.createScore(hotspot, time);
            
        } else {
            if(window.email == '') {
                this.showSignupForm(hotspot);
            } else {
                this.showAlreadySignedForm(hotspot);
            }
        }
    }

    showPrettyTime(totalSeconds) {
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        if(totalSeconds > 59) {
            return minutes + ':' + seconds + ' min';
        } else {
            return seconds + ' sec';
        }
        
    }

    createParticipant(email, type) {
        //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://127.0.0.1:8000/
        let host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        axios.post(host + 'api/participants',{
            'email': email,
            'type' : type
        })
        .then((res) => {
            this.hideSignupForm();

            this.showShareModal();
                        
            window.email = email;
            var emailElement = document.querySelector("#modal-inscription .b--card-c__front-items__bd__input");
            var checkboxElement = document.querySelector("#modal-inscription .b--card-c__front-items__ft__checkbox");
            emailElement.value = '';
            checkboxElement.checked = false;
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    createScore(team, timePassed) {
        //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://127.0.0.1:8000/
        let host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
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

            if(window.email == '') {
                this.showSignupForm(res.data.teamName);
            } else {
                this.showAlreadySignedForm(res.data.teamName);
            }

        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    emailExists(email) {
        //https://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://127.0.0.1:8000/
        var host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        var result;
        return axios.get(host + 'api/participants/' + email)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    // MODAL

    /*
    * targetID
    * targetClass
    * objectTrigger
    */
    openModal(id){
        this.krpano.call("hide_teams()");
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
                this.krpano.call("show_teams()");
                this.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
                this.loadTextData();
                this.startTimer();
                //stop trailer video
                $('.b--video-a__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            });
        });

        // close modal on Bakcdrop Click
        var backdrop = document.querySelectorAll("." + payload.backdropClass);
        backdrop.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                this.krpano.call("show_teams()");
                this.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
                this.loadTextData();
                this.startTimer();
                //stop trailer video
                $('.b--video-a__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
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