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
            site_settings:{},
            personal_info:{},
        }
    },

    components:{
        'badge-list':defineAsyncComponent(()=> import('./components/badge-list.vue') ),
        'badge-item':defineAsyncComponent(()=>import('./components/badge-item.vue')),
        'experience-item':defineAsyncComponent(()=>import('./components/experience-item.vue')),
        'interest-group':defineAsyncComponent(()=>import('./components/interest-group.vue')),
        'my-header':defineAsyncComponent(()=>import('./components/my-header.vue')),
        'my-footer':defineAsyncComponent(()=>import('./components/my-footer.vue')),
    },

    created(){
        this.load_skills()
        this.load_familiarity_skills()
        this.load_experiences()
        this.load_interest_groups()
        this.load_sitesettings()
        this.load_personalinfo()
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

        load_sitesettings(){
            resumeapi.get(`sitesettings/`)
                    .then(res=>{
                        this.site_settings=res.data
                    })
                    .catch(err=>console.log(err))
        },

        load_personalinfo(){
            resumeapi.get(`personalinfo/`)
                    .then(res=>{
                        this.personal_info=res.data
                    })
                    .catch(err=>console.log(err))

        },
    }
}
</script>

<template>
    <my-header :data="personal_info"></my-header>
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

    <my-footer :data="personal_info"></my-footer>
    <div class="flex laptop:flex-row flex-col-reverse justify-center laptop:divide-x-2 divide-rezasecondary bg-gray-800 text-center text-white tablet:text-sm phone:text-xs text-[0.5rem] py-1">
        <p class="laptop:px-3 py-1">{{site_settings.copyright_text}}</p>
        <p class="laptop:px-3 py-1">{{site_settings.builded_text}}</p>
    </div> <!--Copyright text-->
 </template>

<style>

</style>
