<template>
    <a :href="post.link" class="b--card-e b--card-e--second" v-scroll-reveal.reset>  
        <div class="b--card-e__front-items">
            <div class="b--card-e__front-items__wrapper">
                <div class="b--card-e__front-items__wrapper__bd">
                    <h3 class="b--card-e__front-items__wrapper__bd__title" v-html="post.title.rendered"></h3>
                    <p class="b--card-e__front-items__wrapper__bd__content" v-html="post.excerpt.rendered"></p>
                </div> 
            </div> 
        </div>
        <div class="b--card-e__back-items">
            <img class="b--card-e__back-items__img" v-lazy="post.post_improvement.post_random_image" alt="" v-if="post.post_improvement.post_random_image">
        </div>
    </a>
</template>
<script>
export default {
    props : [
        'post'
    ]
}
</script>