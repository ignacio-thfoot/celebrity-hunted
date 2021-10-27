<template>
    <div class="b--form-group-a">
        <div class="b--form-radial-b" :class="{'b--form-radial-b--error' : error}">
            <input type="radio" class="b--form-radial-b__item" :id="'radial-' + field_id" name="radial">
            <span class="b--form-radial-b__artwork"></span>
            <label class="b--form-radial-b__title" :for="'radial-' + field_id" v-if="text">{{text}}</label>
        </div>
        <span v-if="error" class="b--form-error-a">{{message}}</span>
    </div>
</template>
<script>
export default {
    props : [
        'error',
        'message',
        'text',
        'field_id'
    ]
}
</script>