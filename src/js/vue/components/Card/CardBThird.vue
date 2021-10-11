<template>
    <a :href="works.link" class="b--layout-b__item b--card-b b--card-b--third">
        <div class="b--card-b__ft-items">
            <div class="b--card-b__ft-items__item-left">
                <h3 class="b--card-b__ft-items__item-left__title" v-html="works.post_title"></h3>
                <div class="b--card-b__ft-items__item-left__content" v-if="works.services">
                    <span class="b--card-b__ft-items__item-left__content__artwork" v-for="(cat,c) in works.services" :key="c" v-html="cat.post_title"></span> 
                </div>
            </div>
            <div class="b--card-b__ft-items__item-right" v-if="works.card_logo">
                <div class="b--card-b__ft-items__item-right__media-wrapper">
                    <img :src="works.card_logo" alt="" class="b--card-b__ft-items__item-right__media-wrapper__media">
                </div>
            </div>
        </div>
        <div class="b--card-b__bg-items" v-if="works.index_image">
            <div class="b--card-b__bg-items__media-wrapper">
                <img class="b--card-b__bg-items__media-wrapper__media" :src="works.index_image" alt="img">
            </div>
        </div>
    </a>
</template>
<script>
export default {
    props : [
        'works'
    ]
}
</script>