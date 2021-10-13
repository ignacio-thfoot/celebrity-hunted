//CSS
import './../scss/entries/home.scss';

import Modal from './../js/ds/Modal';
import Blazy from 'blazy';
import axios from 'axios';

class Home {
    constructor(){
        this.init();
    }

    init(){
        new Modal();
        new Blazy({ 
            selector: '.b--lazy-a',
            successClass: 'b--lazy-a--fade-in',
        });

        document.addEventListener("loaded", (e) => {
            setTimeout(() => {
                let preloader = document.querySelector(".b--preloader-a");
                preloader.classList.remove("b--preloader-a--is-active");

                this.events();

            }, 50);            
        });
        
        window.selectedTeams = [];
        window.email = '';
    }

    events() {
        let team_buttons = document.querySelectorAll(".team_buttons");

        team_buttons.forEach((team) => {
            team.addEventListener("click", (e) => {
                this.selectTeam(team);
            });
        });

        let team_hotspots = document.querySelectorAll(".team_hotspots");
        team_hotspots.forEach((hotspot) => {
            hotspot.addEventListener("click", (e) => {
                console.log(hotspot.id);
            });
        });

    }

    selectTeam(team) {
        var result = window.selectedTeams.filter(obj => {
            return obj.team === team.id
        });

        console.log(result);

        if(result.length == 0) {
            window.currentTeam = team.id;
            var d = new Date();
            var n = d.getMilliseconds();
            window.selectedTeams.push({"team" : team.id, "start" : n, "stop":''});
            document.querySelector("#" + team.id).classList.add("is--active");
        } else {
            alert("YOU HAVE ALREADY CHOSEN THIS TEAM");
        }
    }

    findHotSpot() {

    }

    createParticipant(email, type) {
        axios.post('//localhost:8000/api/participants',{
            'email':email,
            'type': type
        })
        .then((res) => {
            console.log("RESPONSE", res);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
    }

    testApi() {
        

        axios.post('//localhost:8000/api/scores',{
            'teamName':'team-1',
            'timePassed' : Math.floor(Math.random() * (90 - 60) + 60)
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