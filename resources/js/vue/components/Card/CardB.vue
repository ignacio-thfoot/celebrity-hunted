<template>
        <a class="b--card-b">
            <h3 class="f--color-b">
                COLOR-B
            </h3>
        </a>
</template>
<script>
import Pill from './../Pill/Pill.vue';
export default {
    components:{
        'app-pill': Pill
    },
    props : [
        'timestamp',
    ]
    
}
</script>