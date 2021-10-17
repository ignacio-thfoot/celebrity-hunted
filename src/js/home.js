//CSS
import './../scss/entries/home.scss';

import Modal from './../js/ds/Modal';
import Blazy from 'blazy';
import axios from 'axios';
import data from './../data/data.json';


class Home {
    constructor(){
        this.init();
        this.rotate = document.querySelector('.b--rotate-a'); //rotate window
    }

    init(){
        new Modal();
        new Blazy({ 
            selector: '.b--lazy-a',
            successClass: 'b--lazy-a--fade-in',
        });
        
        this.loadTextData();
        
        this.cookiesClickEvent();

        document.addEventListener("loaded", (e) => {
            setTimeout(() => {
                this.hidePreloader();
                this.events();
            }, 50);            
        });
        
        window.selectedTeams = [];
        window.email = '';
    }

    cookiesClickEvent() {
        document.querySelector(".js--click-setCookie").addEventListener("click", (e) => {
            document.querySelector(".b--cookies-a").style.display = 'none';
        });
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

    showSignupForm() {
        document.querySelector(".b--card-c").classList.add("b--card-c--is-visible");
    }

    hideSignupForm() {
        document.querySelector(".b--card-c").classList.remove("b--card-c--is-visible");
    }

    showShareModal() {
        document.querySelector(".b--card-d").classList.add("b--card-d--is-visible");
    }

    hideShareModal() {
        document.querySelector(".b--card-d").classList.remove("b--card-d--is-visible");
    }

    events() {
        document.querySelector(".b--card-b__front-items__bd__btn").addEventListener("click", () =>  {
            document.querySelector(".b--card-b").classList.toggle("b--card-b--is-hidden");
        });

        document.querySelectorAll(".team_buttons").forEach((team) => {
            team.addEventListener("click", this.teamClickHandler.bind(this));
        });

        document.querySelectorAll(".team_hotspots").forEach((hotspot) => {
            hotspot.addEventListener("click", this.hotspotClickHandler.bind(this));
        });

        document.querySelector(".b--card-c__front-items__bd__input__icon").addEventListener("click", () => {
            this.registerEmail();
        });

        document.querySelector(".b--card-d__media-wrapper__icon").addEventListener("click", () => {
            document.querySelector(".b--card-d").classList.remove("b--card-d--is-visible");
        })

        //rotate
        window.mobilecheck = () => {
            var check = false;
            ((a) => {if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
    
        /**
         * If on mobile, checks if webpage is loader vertically or horizontally, shows rotate alert
         * accordingly and registers rotation event 
         */
        if(window.mobilecheck() == true){
            if(screen.orientation.angle == 90){
                this.rotate.classList.add("b--rotate-a--is-visible");
            }
            window.addEventListener('orientationchange', this.checkOrientationChange.bind(this));
        }

    }

    registerEmail() {
        var email = document.querySelector(".b--card-c__front-items__bd__input").value;
        if (this.validateEmail(email)) {
            this.createParticipant(email, 'jeux');
        } else {
            alert("E-Mail pas correct.");
        }
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
    * If mobile is rotated, shows rotate alert accordingly
    */
    checkOrientationChange(){
        let screenOrientation = screen.orientation.angle;
        if(screenOrientation == 0){
            this.rotate.classList.remove("b--rotate-a--is-visible")
        } else {
            this.rotate.classList.add("b--rotate-a--is-visible")
        }
    }

    teamClickHandler(e){
        this.selectTeam(e.srcElement);
        this.hideSignupForm();
        console.log(e.srcElement.id);
    }

    hotspotClickHandler(e){
        this.findHotSpot(e.srcElement);
        console.log(e.srcElement.id);
    }

    selectTeam(team) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === team.id
        });
        if(result.length == 0) {
            window.currentTeam = team.id;
            let d = performance.now();
            window.selectedTeams.push({"team" : team.id, "start" : d, "stop": 0});
        }
    }

    findHotSpot(hotspot) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team + "_hotspot" === hotspot.id;
        });

        if(result.length == 0) {
            //team not yet selected
        } else {
            if(result[0].stop == 0) {
                let d = performance.now();
                result[0].stop = d;
                console.log(result[0]);
                let team = document.getElementById(result[0].team);
                team.classList.add("is--active");
                let time = Math.round((result[0].stop - result[0].start) / 1000);
                this.createScore(team.id, time);
                this.showSignupForm();
            } else {
                //Team already found
            }
        }
    }

    showPrettyTime(totalSeconds) {
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        return minutes + ' minutes, ' + seconds + ' seconds.';
    }

    createParticipant(email, type) {
        //http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://locahost:8000/
        let host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        axios.post(host + 'api/participants',{
            'email': email,
            'type': type
        })
        .then((res) => {
            console.log("RESPONSE", res);
            this.hideSignupForm();
            this.showShareModal();
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    createScore(team, timePassed) {
        //http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/
        //http://locahost:8000/
        let host = 'http://pmchapi-env.eba-i79zkcey.eu-west-3.elasticbeanstalk.com/index.php/';
        axios.post(host + 'api/scores',{
            'teamName':team,
            'timePassed' : timePassed,
        })
        .then((res) => {
            console.log("RESPONSE", res);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }
}

export default Home;
new Home();