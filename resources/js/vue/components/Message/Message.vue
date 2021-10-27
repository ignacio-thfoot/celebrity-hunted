<template>
    <div class="b--message-a">
        <p class="b--message-a__content" v-html="message"></p>
    </div>
</template>
<script>
export default {
    props : [
        'message'
    ]
}
</script>