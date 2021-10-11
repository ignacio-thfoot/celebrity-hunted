<template>
    <div class="b--card-c" v-scroll-reveal.reset="{delay : 200}">
        <div class="b--card-c__img-wrapper">
            <img class="b--card-c__img-wrapper__img" v-lazy="image" alt="">
        </div>
        <h2 class="b--card-c__title">{{title}}</h2>
        <h3 class="b--card-c__subtitle">{{job_position}}</h3>
    </div>
</template>
<script>
export default {
    props : [
        'image',
        'title',
        'job_position'
    ]
}
</script>