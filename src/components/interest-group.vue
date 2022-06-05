<script>
import { defineAsyncComponent } from 'vue';
export default{
    components:{
        'badge-item':defineAsyncComponent(()=>import('./badge-item.vue')),
    },

    data(){
        return{

        }
    },

    mounted(){
    },

    props:['data']
}
</script>

<template>
    <div v-if="data.badges.length!=0" class="flex tablet:flex-row flex-col tablet:items-baseline items-center"> <!--InWork interests list-->
        <h5 class="text-rezablack tablet:text-base font-semibold text-lg w-[6rem] text-center" :title="data.description">#{{data.name}}:</h5>
        <ul class="flex flex-wrap px-4 tablet:place-content-start "> <!--  justify-center -->
            <badge-item v-for="badge in data.badges" :key="badge.id" :data="badge"></badge-item>
        </ul>
    </div>
</template>

