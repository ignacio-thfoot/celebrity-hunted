<template>
    <div class="b--card-a" v-scroll-reveal.reset="{ delay: 150 }">
        <h3 class="b--card-a__title" v-html="title"></h3>
        <p class="b--card-a__content" v-html="subheading"></p>
    </div>
</template>
<script>
export default {
    props : [
        'title',
        'subheading'
    ]
}
</script>