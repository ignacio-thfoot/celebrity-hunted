<template>
    <!-- <a :href="post.link" class="b--card-e double-layer-ba"  v-scroll-reveal.reset="{ delay: 200 }">   -->
    <a :href="post.link" class="b--card-e"  v-scroll-reveal.reset="{ delay: 200 }">  
        <div class="b--card-e__front-items">
            <div class="b--card-e__front-items__wrapper">
                <time :datetime="new Date(post.date) | dateFormat('YYYY-MM-D')" class="b--card-e__front-items__wrapper__date">{{new Date(post.date) | dateFormat('MMM D, YYYY')}}</time>  
                <div class="b--card-e__front-items__wrapper__bd">
                    <h2 class="b--card-e__front-items__wrapper__bd__title" v-html="post.title.rendered"></h2>
                    <p class="b--card-e__front-items__wrapper__bd__author">{{post.post_improvement.author}}</p>
                </div>
            </div> 
        </div>
        <div class="b--card-e__back-items">
            <img class="b--card-e__back-items__img" v-lazy="post.post_improvement.post_random_image" alt="" v-if="post.post_improvement.post_random_image">
            <img class="b--card-e__back-items__img" v-lazy="post.post_improvement.image" alt="" v-if="post.post_improvement.image && !post.post_improvement.post_random_image">
        </div>
    </a>
</template>
<script>
export default {
    props :[
        'post'
    ]
}
</script>