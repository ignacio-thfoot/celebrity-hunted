//CSS
import './../scss/entries/home.scss';
import Blazy from 'blazy';
import axios from 'axios';
import data from './../data/data.json';


//ssh -i KeyPairAmazon.pem ec2-user@amazonprimecelebrityhunted-env.eba-pgszqys2.eu-west-3.elasticbeanstalk.com

//F&x$LGb665saNLfB

// #zeFK7rNKC69X&P8 (nuevo) 24/10
class Post {
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
            this.krpano = document.getElementById("krpanoSWFObject");
            this.events();
            this.showMobileHeader();
            this.hidePreloader();
            this.hideKrpanoButtons();
        });
        
        window.selectedTeams = [];
        window.email = '';
        window.emailExists = [];

        window.isMuted = false;
        
        window.lastScoreID = 0;

        this.preloadImages([
            'skin/assets/team1_sprite.png',
            'skin/assets/team2_sprite.png',
            'skin/assets/team3_sprite.png',
            'skin/assets/team4_sprite.png'
        ]);

        window.audio = new Audio('img/celebrity_hunted.mp3');
        this.audioVolume = .2;

        window.lastTeam = '';
    }

    playSound() {
        var self = this;
        window.audio.addEventListener('ended', function() {
            window.audio.currentTime = 0;
            window.audio.play();
        }, false);
        window.audio.play();
        window.audio.volume = this.audioVolume;
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
            let $header = $("#header");
            let cardHeaders = $(".b--card-c__hd");
            var attributes = $header.prop("attributes");

            $.each(attributes, function(i, attribute) {
                $.each(cardHeaders, function(j, cardHeader) {
                    $(cardHeader).attr(attribute.name, attribute.value);
                    $(cardHeader).offset($header.offset());
                });
            });
            

            let $logo = $("#amazon_logo");
            let cardFooters = $(".b--card-c__ft");
            var attributes = $logo.prop("attributes");
            $.each(attributes, function(i, attribute) {
                $.each(cardFooters, function(j, cardFooter) {
                    $(cardFooter).attr(attribute.name, attribute.value);
                    $(cardFooter).offset($logo.offset());
                });
            });
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


    loadTextData() {
        var textElements = document.querySelectorAll("[data-text]");

        textElements.forEach((el) => {
            el.innerHTML = data.post[el.getAttribute("data-text")];
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

        console.log(team, result[0]);

        let totalSeconds = result[0].totalSeconds;
        let teamAverage = result[0].teamAverage;
        let content = document.querySelector("#modal-inscription .b--card-c__front-items__bd__content");

        //reset content
        content.innerHTML = data['post'].win_text;

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
        console.log(team, result[0]);
        let totalSeconds = result[0].totalSeconds;
        let content = document.querySelector("#modal-inscription-2 .b--card-c__front-items__bd__content");

        //reset content
        content.innerHTML = data['text'].win_text;

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
        document.addEventListener('fullscreenchange', this.exitHandler);
        document.addEventListener('webkitfullscreenchange', this.exitHandler);
        document.addEventListener('mozfullscreenchange', this.exitHandler);
        document.addEventListener('MSFullscreenChange', this.exitHandler);

        //home start button
        document.querySelector("#modal-home .b--card-c__front-items__bd__btn").addEventListener("click", (e) =>  {
            this.toggleFullscreen(e);
            document.querySelector("#modal-home").classList.remove("b--card-c--is-visible");
            this.showKrpanoButtons();
            this.startTimer();
            this.playSound();
        });

        document.addEventListener("fullscreen", (e) => {
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
        
        document.querySelector("#modal-inscription .b--card-c__media-wrapper__icon").addEventListener("click", () => {
            document.querySelector("#modal-inscription").classList.remove("b--card-c--is-visible");
        });

        //trailer
        document.addEventListener("button_trailer", () => {
            this.showTrailer();
        });
        
        //about - help
        document.addEventListener("about", (e) => {
            this.showHelpModal();
        });

        document.querySelector("#modal-home [data-text='welcome_more']").addEventListener("click", (e) => {
            e.preventDefault();
            this.showHelpModal();
        });

        //check rotate
        if(this.mobileCheck() == true){
            var orientation = (screen.orientation !== undefined) ? screen.orientation.angle : window.orientation;
            if(orientation == 90){
                this.rotate.classList.add("b--rotate-a--is-visible");
            }
            window.addEventListener('orientationchange', this.checkOrientationChange.bind(this));
        }

        // background sound and toggle mute
        document.addEventListener("mute", () => {
            if(!window.audio.paused) {
                // window.audio.volume = 0;
                window.audio.pause();
                this.isMuted = true;
            } else {
                // window.audio.volume = this.audioVolume;
                window.audio.play();
                this.isMuted = false;
            }
        });
    }

    exitHandler() {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            let fullscreen_button = document.querySelector("#fullscreen");
            fullscreen_button.classList.remove("fullscreen-back");
        }
    }

    showTrailer() {
        if(!this.isMuted){ 
            // window.audio.volume = 0;
            window.audio.pause();
        }
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
        var chkBoxLabel = document.querySelector("#modal-inscription .b--card-c__front-items__ft__label");
        var chkBoxLink = document.querySelector("#modal-inscription .b--card-c__front-items__ft__link");
        if (!this.validateEmail(emailElement.value)) {
            emailElement.classList.add("error_border");
            emailElement.classList.add("error");
            if (!checkboxElement.checked) {
                checkboxElement.classList.add("error_border");
                chkBoxLabel.classList.add("error");
                chkBoxLink.classList.add("error");
            } else {
                checkboxElement.classList.remove("error_border");
                chkBoxLabel.classList.remove("error");
                chkBoxLink.classList.remove("error");
            }
        }else if (!checkboxElement.checked) {
            checkboxElement.classList.add("error_border");
            chkBoxLabel.classList.add("error");
            chkBoxLink.classList.add("error");
            if(this.validateEmail(emailElement.value)) {
                emailElement.classList.remove("error_border");
                emailElement.classList.remove("error");
            }
        } else {
            this.emailExists(emailElement.value).then((res) => {
                if(res.data.length == 0) {
                    this.createParticipant(emailElement.value, 'game');
                    window.email = emailElement.value;
                } else {
                    window.usedEmail = emailElement.value;
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
        $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about, #mute").fadeTo("fast", 0);
    }

    showKrpanoButtons() {
        $("#team_container, #button_trailer, #direction_buttons, #zoom_buttons, #fullscreen, #about, #mute").fadeTo("fast", 1);
    }

    findHotSpot(hotspot) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === hotspot;
        });

        window.lastTeam = hotspot;

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
            return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + ' min';
        } else {
            return seconds + ' sec';
        }
        
    }

    createParticipant(email, type) {
        axios.post('/index.php/api/participants',{
            'email': email,
            'type' : type
        })
        .then((res) => {
            this.hideSignupForm();

            if(type == 'game') this.showShareModal();
                        
            if (type == 'game') window.email = email;
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
        axios.get('/index.php/api/scores/average/' + data.teams[team])
        .then((res) => {
            // console.log("RESPONSE", res);

            var result = window.selectedTeams.filter(obj => {
                return obj.team === team;
            });

            result[0].teamAverage = res.data.avg;

            this.showSignupForm(team);

        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    emailExists(email) {
        var result;
        return axios.get('/index.php/api/participants/' + email)
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
        var closeBtn = document.querySelectorAll('#' + id + ' .close-modal');
        closeBtn.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault(); 
                this.krpano.call("show_teams()");
                this.removeClass(document.querySelector(payload.targetID),payload.targetClass);
                this.removeBackdrop(payload);
                //this.loadTextData();
                this.startTimer();
                //stop trailer video
                $('.b--video-a__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                //bring back background audio
                if(id == 'modal-trailer') {
                    if(!this.isMuted){
                        // window.audio.volume = this.audioVolume;
                        window.audio.play();
                    }
                }
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
                //this.loadTextData();
                this.startTimer();
                //stop trailer video
                $('.b--video-a__video iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                //bring back background audio
                if(id == 'modal-trailer') {
                    if(!this.isMuted){
                        // window.audio.volume = this.audioVolume;
                        window.audio.play();
                    }
                }
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

export default Post;
new Post();