<template>
    <div class="b--form-group-a" >
        <div class="b--form-checkbox-b" :class="{'b--form-checkbox-b' : error}">
            <input type="checkbox" class="b--form-checkbox-b__item" :id="'checkbox' + field_id">
            <span class="b--form-checkbox-b__artwork"></span>
            <label class="b--form-checkbox-b__title" :for="'checkbox' + field_id" v-if="text">{{text}}</label>
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