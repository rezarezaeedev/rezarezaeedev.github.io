<script>
export default{
    data(){
        return{

        }
    },

    props:['data']
}
</script>

<template>
    <li>
        <a rel="nofollow" :href="data.description_link" :title="data.description" class="tablet:text-base text-xs inline-block px-4 py-2 my-3 mr-3 bg-rezablack text-rezawhite rounded-full hover:scale-105 hover:text-rezaprimary select-none">{{data.name}}</a>
    </li>
</template>

