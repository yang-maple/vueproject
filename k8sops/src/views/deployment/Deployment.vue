<template>
    <div>deployment</div>
</template>

<script>

export default{
    data(){},
    created(){
            this.Testaxios()
            
        },
    methods:{
        Testaxios(){
            this.$ajax.get("/namespaces/list").then((res)=>{
                console.log(res.data);
                console.log(res.data.result);
            }).catch(function(res){
                console.log(res.data);
            })
        },
        },
}

</script>
