<template>
    <a :href="post.link" class="b--card-f">
        <span class="b--card-f__category">{{post.category}}</span>
        <p class="b--card-f__title">{{post.title}}</p>
        <p class="b--card-f__author">{{post.author}}</p>
    </a>
</template>
<script>
export default {
    props : [
        'post'
    ]
}
</script>