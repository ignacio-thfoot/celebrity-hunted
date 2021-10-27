<template>
    <div class="f--row">
        <div class="f--col-4" v-for="(member,m) in members" :key="m">
            <app-card-c :image="member.image" :title="member.display_name" :job_position="member.job_position" />
        </div>
    </div>
</template>
<script>
export default {
    props : [
        'members'
    ],
     components:{
        'app-card-c':  () => import('./../../components/Card/CardC.vue'),
    },
}
</script>