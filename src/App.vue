<script>
import resumeapi from './apis/resume-api';
import { defineAsyncComponent } from 'vue';

export default{
    data(){
        return {
            skills:[],
            familiarity_skills:[],
            experiences:[],
            interests:[],
            is_loaded:false,
        }
    },

    components:{
        'badge-list':defineAsyncComponent(()=> import('./components/badge-list.vue') ),
        'badge-item':defineAsyncComponent(()=>import('./components/badge-item.vue')),
        'experience-item':defineAsyncComponent(()=>import('./components/experience-item.vue')),
        'interest-group':defineAsyncComponent(()=>import('./components/interest-group.vue')),

    },

    created(){
        this.load_skills()
        this.load_familiarity_skills()
        this.load_experiences()
        this.load_interest_groups()
    },

    mounted(){
        this.is_loaded=true
    },

    methods:{
        load_skills(){
            resumeapi.get('skills/skills')
            .then(res=>{
                this.skills=res.data
            })
            .catch(err=>console.log(err))
        },

        load_familiarity_skills(){
            resumeapi.get('skills/familiarities')
            .then(res=>{
                this.familiarity_skills=res.data
            })
            .catch(err=>console.log(err))
        },

        load_experiences(){
            resumeapi.get('experiences')
            .then(res=>{
                this.experiences=res.data
            })
            .catch(err=>console.log(err))
        },
        
        load_interest_groups(){
            resumeapi.get('interestgroups')
            let groups;
            resumeapi.get('interestgroups')
                .then(res=>{
                    groups=res.data;
                    this.load_interest_badges(groups);
                
                })
                .catch(err=>console.log(err))
        },
        
        load_interest_badges(groups){
            for (const group of groups) {
                resumeapi.get(`interestbadges/${group.id}`)
                    .then(res=>{
                        let temp = {...group, 'badges':res.data}
                        this.interests.push(temp)
                    })
                    .catch(err=>console.log(err))
            }
        },
    }
}
</script>

<template>
    <header class=" w-full bg-rezablack myshape shadow-md shadow-rezaprimary flex laptop:flex-row flex-col-reverse items-center justify-between phone:px-24 px-5 pt-10 laptop:pb-24  pb-10 laptop:mb-44 mb-16">
        <div class="flex flex-col laptop:w-6/12 w-full laptop:space-y-8 space-y-11 mb-9 mt-8 laptop:text-left text-center ">
            <h1 class="text-rezaprimary tablet:text-6xl phone:text-5xl text-4xl capitalize"><strong>Reza Rezaee</strong></h1>
            <article class="space-y-0 laptop:min-w-[26rem] laptop:w-7/12 tablet:mx-0 phone:mx-auto">
                <h2 class="phone:text-2xl text-xl font-semibold text-white border-b-2 pb-1 mb-3 border-rezasecondary normal-case">Backend developer</h2>
                <p class="bg-inherit w-full max-h-56 overflow-y-auto text-rezawhite font-light text-justify whitespace-pre-line pr-3 scrollpurple  normal-case">hello I'm Reza, and wants to build a powerfull website for you that you can bussiness comfort, and I code for you by python/Django/DRf. call me for ording. 
                    
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti deserunt pariatur facilis. Nihil vitae fuga nam eius? Possimus exercitationem dolore illum at illo nulla reiciendis inventore iure tempore necessitatibus cum saepe consectetur, ratione minus excepturi odio rem aliquam dolorum earum eveniet repellat ipsum est? Aliquid provident modi fuga culpa deserunt! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque hic eius temporibus nisi harum reiciendis ratione quam animi tempore! Praesentium, aliquam? Nihil veritatis sequi deserunt optio repudiandae voluptate, ullam eveniet dolorem repellat mollitia repellendus at! Natus eum consectetur perspiciatis quos tempore odio, nostrum veritatis ad quo quidem! Quisquam, distinctio doloribus.</p>
            </article>
        </div>
        <!-- profile photo -->
        <div class="flex items-center"> 
            <img class="laptop:w-64 laptop:h-64 phone:w-60 phone:h-60 w-48 h-48 rounded-full object-cover bg-auto hover:scale-125 transition-all ease-in-out outline-none ring-rezaprimary ring-4" src="./assets/images/mr2-min.jpg" alt="Reza Rezaee face photo">
        </div>
    </header>
    <main class="container desktop:px-20 px-2 mx-auto desktop:space-y-36 space-y-24" v-if="is_loaded">
        <div class="flex laptop:flex-row flex-col items-center laptop:space-x-40 laptop:space-y-0  space-y-24 box-border">  <!--Main Skills box -->
            <div class="laptop:w-6/12 tablet:w-8/12 laptop:self-baseline">    <!--Skills box -->
                <badge-list name="Skills">
                    <template v-slot:icon>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="hover:animate-spin bi bi-star-fill text-rezablack inline-block align-top desktop:w-6 desktop:h-6 w-5 h-5" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </template>
                    <badge-item v-for="data in skills" :key="data.id" :data="data"></badge-item>
                </badge-list>
            </div>

            <div class="laptop:w-6/12 tablet:w-8/12 laptop:self-baseline">    <!--Familiarity box -->
                <badge-list name="Familiarity">
                    <badge-item v-for="data in familiarity_skills" :key="data.id" :data="data"></badge-item>
                </badge-list>
            </div>
         </div>

        <div class="laptop:w-full tablet:w-8/12 mx-auto">  <!--Experiences/Projects Box-->
            <badge-list name="Experiences/Projects" extra_class="space-y-12 divide-y-2 ">
                <experience-item v-for="data in experiences" :key="data.id" :data="data"></experience-item>
            </badge-list>
        </div>

        <div class="laptop:w-full tablet:w-8/12 mx-auto">  <!--Main Interests box-->
            <badge-list name="Interests" extra_class="flex-col space-y-10">
                <template v-slot:icon>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="hover:animate-bounce bi bi-balloon-heart-fill text-rezablack hover:text-red-500 inline-block align-top desktop:w-6 desktop:h-6 w-5 h-5" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
                    </svg>
                </template>
                <interest-group v-for="data in interests" :key="data.id" :data="data"></interest-group>
            </badge-list>
        </div>

    </main>
    <div class="container mx-auto text-center laptop:my-32 tablet:my-20 my-10 laptop:text-4xl tablet:text-3xl text-lg text-rezasecondary animate-pulse" v-else>Please wait, is loading...</div>

    <footer class="bg-rezablack px-10 py-5 mt-28 flex flex-col"> 
        
        <div class="container desktop:px-20 desktop:mx-auto flex flex-col tablet:space-x-0 space-y-5 ">
            <div class="flex space-x-5 justify-center"> <!--Social media section-->
                <a href="#" class="text-rezawhite hover:scale-125 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                </a>
    
                <a href="#" class="text-rezawhite hover:scale-125 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                </a>
                <a href="#" class="text-rezawhite hover:scale-125 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                </a>
                <a href="#" class="text-rezawhite hover:scale-125 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                    </svg>
                </a>
            </div>
            <div class="flex flex-col space-y-2"> <!--Call info section-->
                <div class="flex text-rezawhite items-center tablet:text-xl text-sm space-x-2 hover:text-rezaprimary" > <!--Phone number-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg>
                    <a href="tel:+98-930-116-2905" rel="nofollow">+98 0930 116 2905</a >
                </div>

                <div class="flex text-rezawhite items-center tablet:text-xl text-sm space-x-2 hover:text-rezaprimary"> <!--Address-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                        <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                    </svg>
                    <span>Esfahan-artesh avn</span>
                </div>

                <div class="flex text-rezawhite items-center tablet:text-lg text-xs space-x-2 hover:text-rezaprimary"> <!--Address-->
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                    </svg>
                    <span>rezarezaee.commercial@gmail.com</span>
                </div>      
            </div>
        </div>
    </footer>
    <p class="bg-gray-800  text-center text-white tablet:text-sm phone:text-xs text-[0.5rem] py-1">Copyright &copy; 2022 Reza Rezaee. All rights reserved.</p> <!--Copyright text-->
 </template>

<style>

</style>
