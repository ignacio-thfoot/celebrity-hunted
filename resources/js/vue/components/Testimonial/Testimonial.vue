<template>
    <div class="b--testimonial-a">
        <h3 class="b--testimonial-a__title"  v-html="post.testimonial_title"></h3>
        <p class="b--testimonial-a__content" v-html="post.testimonial_text"></p>
        <div class="b--testimonial-a__ft">
            <div class="b--testimonial-a__ft__content">
                <h5 class="b--testimonial-a__ft__content__title">{{post.testimonial_name}}</h5>
                <p class="b--testimonial-a__ft__content__subtitle" v-html="post.testimonial_tagline"></p>
            </div>
            <div class="b--testimonial-a__ft__img-wrapper">
                <img class="b--testimonial-a__ft__img-wrapper__img" v-lazy="post.testimonial_icon" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'post'
    ]
}
</script>