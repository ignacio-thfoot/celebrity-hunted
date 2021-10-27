<template>
    <div>
        <label for="default-input" class="b--form-label-a">Search</label>
        <div class="b--form-input-icon-a">
            <input type="text" class="b--form-input-icon-a__item" id="default-input-icon" v-model="query" v-on:keyup="autoComplete" placeholder="Search by movie name and genre">
            <svg class="b--form-input-icon-a__artwork" viewBox="0 0 20 20" v-on:click="search(query)">
                <path fill="none" d="M12.323,2.398c-0.741-0.312-1.523-0.472-2.319-0.472c-2.394,0-4.544,1.423-5.476,3.625C3.907,7.013,3.896,8.629,4.49,10.102c0.528,1.304,1.494,2.333,2.72,2.99L5.467,17.33c-0.113,0.273,0.018,0.59,0.292,0.703c0.068,0.027,0.137,0.041,0.206,0.041c0.211,0,0.412-0.127,0.498-0.334l1.74-4.23c0.583,0.186,1.18,0.309,1.795,0.309c2.394,0,4.544-1.424,5.478-3.629C16.755,7.173,15.342,3.68,12.323,2.398z M14.488,9.77c-0.769,1.807-2.529,2.975-4.49,2.975c-0.651,0-1.291-0.131-1.897-0.387c-0.002-0.004-0.002-0.004-0.002-0.004c-0.003,0-0.003,0-0.003,0s0,0,0,0c-1.195-0.508-2.121-1.452-2.607-2.656c-0.489-1.205-0.477-2.53,0.03-3.727c0.764-1.805,2.525-2.969,4.487-2.969c0.651,0,1.292,0.129,1.898,0.386C14.374,4.438,15.533,7.3,14.488,9.77z"></path>
            </svg>
        </div>
        
        <div class="b--suggestions-a" v-if="suggestions.length">
            <h2 class="b--suggestions-a__title">Suggestions...</h2>
            <ul class="b--vlist-a">
                <li class="b--vlist-a__list-item" v-for="result in suggestions" :key="result">
                    <a href="#" class="b--link-a" v-on:click="search(result)" v-html="mark(result.toLowerCase())"></a>
                </li>
            </ul>
        </div>
        <div class="b--results-a" v-if="results.length">
            <h3 class="b--results-a__title">Results</h3>
            <ul class="b--vlist-a">
                <li class="b--vlist-a__list-item" v-for="result in results" :key="result.id">
                    <a href="#" class="b--link-b" v-on:click="showDetails(result)">{{ result.name }} ({{ result.genre }})</a>
                </li>
            </ul>
        </div>

        <div id="modal-1" class="b--modal-a" role="dialog" v-if="film">
            <div class="b--card-a">
                <div class="b--card-a__media-wrapper">
                    <img class="b--card-a__media-wrapper__media" :src="getImage(film.image)" alt="">
                </div>
                <div class="b--card-a__bd">
                    <h3 class="b--card-a__bd__title">{{ film.name }}</h3>
                    <p class="b--card-a__bd__content"><span class="b--card-a__bd__content__hd">Genre:</span> {{ film.genre }}</p>
                    <p class="b--card-a__bd__content"><span class="b--card-a__bd__content__hd">Year:</span>  {{ film.year }}</p>
                    <p class="b--card-a__bd__content"><span class="b--card-a__bd__content__hd">Comment by [user]:</span> 
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus, culpa totam! Praesentium eius nobis libero enim beatae quaerat possimus rerum, quae maxime, illo fugiat tenetur consequuntur corrupti culpa, necessitatibus vel?</p>
                    
                </div>
                <button class="b--modal-a__btn" data-dismiss="modal-1" aria-label="Close">
                    <svg class="b--modal-a__btn__icon apb apb-close" viewBox="0 0 15.81 15.81" enable-background="new 0 0 15.81 15.81" xml:space="preserve">
                        <path d="M8.74,8.03l6.82,6.82l-0.71,0.71L8.03,8.74l-7.07,7.07L0.25,15.1l7.07-7.07L0,0.71L0.71,0l7.32,7.32l7.07-7.07l0.71,0.71
                        L8.74,8.03z"/>
                    </svg>
                </button>
            </div>
        </div>

    </div>
</template>
<script>

    export default{
    data(){
        return {
            query: '',
            suggestions: [],
            results: [],
            film: null,
            showDetails(film) {

                this.film = film;

                //target
                let targetID = "#modal-1";
                let targetClass = "b--modal-a--is-active";
                
                // backdrop
                let backdropClass = "b--backdrop-a--is-active";

                setTimeout(function() {
                    document.querySelector(targetID).classList.toggle(targetClass);
                    //create Backdrop div with class
                    let div = document.createElement('div');
                    div.className = backdropClass;
                    document.body.appendChild(div);

                    let closeBtn = document.querySelector('[data-dismiss]');
                    closeBtn.addEventListener('click', event => {
                        event.preventDefault(); 
                        document.querySelector(targetID).classList.remove(targetClass);
                    });

                }, 100);
            },
            getImage(image) {
                return '../storage/img/' + image;
            }
        }
    },
        
    methods: {
        autoComplete(){
            this.suggestions = [];
            if(this.query.length > 0){
                axios.get('/autocomplete',{params: {query: this.query}}).then(response => {
                    this.suggestions = response.data;
                });
            }
        },
        search(query) {
            this.suggestions = [];
            this.results = [];
            this.query = query.toLowerCase();
            axios.get('/search',{params: {query: query}}).then(response => {
                this.results = response.data;
            });
        },
        mark(result){
            let c = new RegExp(this.query, "ig");
                return result.replace(c,"<mark>"+this.query+"</mark>");
            }
        },
        
    }
</script>