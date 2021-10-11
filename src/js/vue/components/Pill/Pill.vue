<template>
    <span :class="{'b--card-b__ft-items__item-left__content__artwork' : card == 'b','b--card-g__content__artwork' : card == 'g'}">{{text}}</span> 
</template>
<script>
export default {
    props : [
        'text',
        'card'
    ],
}
</script>