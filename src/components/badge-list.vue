<script>
import { defineAsyncComponent } from 'vue'
export default{
    data(){
        return{

        }
    },

    components:{
        'badge-item':defineAsyncComponent(()=>import('./badge-item.vue'))
    },

    props:['items','name']
}
</script>

<template>
    <h4 class="flex space-x-1 justify-center text-center border-b-4 mb-6 pb-3 border-rezasecondary"> <!--box title-->
        <slot name="icon" v-if="$slots.icon"></slot>
        <span class="laptop:text-4xl tablet:text-3xl text-2xl font-semibold text-rezablack">{{name}}</span>    
    </h4>
    <ul class="flex flex-wrap px-4"> <!--  justify-center -->
        <badge-item v-for="data in items" :key="data.id" :data="data"></badge-item>
    </ul>
</template>

