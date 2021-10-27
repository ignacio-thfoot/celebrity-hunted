<template>
    <img class="b--media-a" v-lazy="image" alt="">
</template>
<script>
export default {
    props : [
        "image"
    ]
}
</script>