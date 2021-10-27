<template>
    <div class="b--form-group-a">
        <label class="b--form-label-b" :for="'dropdown-' + field_id" v-if="text"> {{text}} </label>
        <div class="b--form-select-b" :class="{'b--form-select-b--error' : error}">
            <select class="b--form-select-b__item" :id="'dropdown-' + field_id" v-on:change="sendDropdownValue" v-model="categoryModel" aria-label="Select Category">
                <option value="" v-if="optionDefault">{{optionDefault}}</option>
                <option v-for="(option,o) in options" :key="o" :value="option.id">{{option.name}}</option>
            </select>
            <svg class="b--form-select-b__artwork" viewBox="0 0 29.7 15.6">
                <path d="M28.5,0.2c0.3-0.3,0.7-0.3,1,0c0.3,0.3,0.3,0.7,0,1l0,0L15.4,15.4c-0.3,0.3-0.7,0.3-1,0l0,0L0.2,1.2c-0.3-0.3-0.3-0.7,0-1
                c0.3-0.3,0.7-0.3,1,0l0,0l13.7,13.7L28.5,0.2z"/>
            </svg>
        </div>  
        <div class="b--spinner-a b--form-group-a__loader" v-if="spinner">
            <span class="b--spinner-a__artwork"></span>
        </div> 
        <span v-if="error" class="b--form-error-a">{{message}}</span>
    </div>
</template>
<script>
export default {
    data:()=>{
        return{
            categoryModel : '',
        }
    },
    props : [
        'error',
        'message',
        'text',
        'field_id',
        'options',
        'iteraction',
        'categoryModelEmit',
        'spinner',
        'optionDefault'
    ],
    methods: {
        /**
         * Emits inputs model and type
         */
        sendDropdownValue (event) {
            if(this.iteraction){
                this.$emit('loadOnChange', {"value" : this.categoryModel})
            }
        },
        /**
         * Sets models value
         */
        load () {
            this.categoryModel = this.categoryModelEmit;
        }
    },
    created () {
      this.load();
    }
}
</script>