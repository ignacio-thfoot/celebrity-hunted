<template>
    <div class="b--card-d" :class="{'b--card-d--second' : color == 'primary','' : color == 'secondary'}" v-if="post">
        <div class="f--row" v-scroll-reveal.reset="{delay: 100}">
            <div class="f--col-6 f--col-tabletl-5 f--col-mobile-12">
                <div class="b--card-d__item-left">
                    <div class="b--card-d__item-left__img-wrapper">
                        <img class="b--card-d__item-left__img-wrapper__img" v-lazy="post.image" alt="">
                    </div>
                </div>
            </div>
            <div class="f--col-6 f--col-mobile-12">
                <div class="b--card-d__bd">
                    <h1 class="b--card-d__bd__title" v-if="heading">{{post.display_name}}</h1>
                    <h2 class="b--card-d__bd__title" v-if="!heading">{{post.display_name}}</h2>
                    <h2 class="b--card-d__bd__subtitle" v-if="heading">{{post.job_position}}</h2>
                    <h3 class="b--card-d__bd__subtitle" v-if="!heading">{{post.job_position}}</h3>
                    <p class="b--card-d__bd__content">{{post.description}}</p>
                    <a :href="post.link" class="b--card-d__bd__link" v-if="withLink">More Post from {{post.title}} </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'color',
        'post',
        'withLink',
        'heading'
    ]
}
</script>