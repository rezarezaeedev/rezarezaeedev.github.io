<script>
import resumeapi from '../apis/resume-api'
export default{
    props:['data'],

    methods:{
        alttext(){
            return `${this.data.name} ${this.data.job_title} - ${this.data.persian_name}`
        },
    },

}
</script>

<template>
     <header class=" w-full bg-rezablack myshape shadow-md shadow-rezaprimary flex laptop:flex-row flex-col-reverse items-center justify-between phone:px-24 px-5 pt-10 laptop:pb-24  pb-10 laptop:mb-44 mb-16">
        <div class="flex flex-col laptop:w-6/12 w-full laptop:space-y-8 space-y-11 mb-9 mt-8 laptop:text-left text-center ">
            <h1 class="text-rezaprimary tablet:text-6xl phone:text-5xl text-4xl capitalize"><strong>{{data.name}}</strong></h1>
            <article class="space-y-0 laptop:min-w-[26rem] laptop:w-7/12 tablet:mx-0 phone:mx-auto">
                <h2 class="phone:text-2xl text-xl font-semibold text-white border-b-2 pb-1 mb-3 border-rezasecondary normal-case">{{data.job_title}}</h2>
                <p class="bg-inherit w-full max-h-56 overflow-y-auto text-rezawhite font-light text-justify whitespace-pre-line pr-3 scrollpurple  normal-case">{{data.summary}}</p>
            </article>
        </div>
        <!-- profile photo -->
        <div class="flex items-center"> 
            <img :src="data.profile_image" :alt="alttext()" class="laptop:w-64 laptop:h-64 phone:w-60 phone:h-60 w-48 h-48 rounded-full object-cover bg-auto hover:scale-125 transition-all ease-in-out outline-none ring-rezaprimary ring-4">
        </div>
    </header>
 <!--  -->
</template>
