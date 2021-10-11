<template>
     <a :href="link" class="b--cta-a">Learn more about {{topic}}</a>
</template>
<script>
export default {
    props : [
        'topic',
        'link'
    ]
}
</script>