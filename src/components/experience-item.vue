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
    <li class="flex justify-between divide-x-2 pt-1"> <!--  experience item -->
        <div class="space-y-2">
            <div class="flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="laptop:w-5 laptop:h-5 w-4 h-4 bi bi-hexagon-fill text-rezasecondary self-center" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z"/>
                    </svg>
                <h4 class="text-rezasecondary font-bold laptop:text-2xl text-xl ">{{data.position}}</h4>
            </div>
            <div class="pl-6 space-y-1  laptop:w-7/12 w-full "> 
                <a :href="data.related_website" target="_blank" rel="nofollow" class="flex flex-row text-rezablack space-x-3"> 
                    <h3 class="inline laptop:text-lg text-base font-semibold ">{{data.company}}</h3>
                    <svg v-if="data.related_website" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="text-rezablack self-center bi bi-hand-index-fill animate-pulse" viewBox="0 0 16 16">
                        <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046.28.056.543.18.738.288.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108.37.148.689.487.88.716.075.09.141.175.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0z"/>
                    </svg>
                </a>
                <p class="text-rezablack text-justify laptop:text-base text-sm">{{data.rule_description}}</p>
                <div class="flex justify-between">
                    <i class="text-rezablack laptop:text-base text-sm pr-1 hover:text-rezasecondary hover:font-light">{{data.starting_date}} - {{data.starting_date}}</i>
                    <i class="text-rezablack laptop:text-base text-sm pl-1 hover:text-rezasecondary hover:font-light">{{data.location}}</i>
                </div>
            </div> 
        </div>
    </li>
</template>
