<template>
  <div class="_page_" id="_page_">
    <slot></slot>
  </div>
</template>

<script>
export default {

    mounted(){
        
        $('#_page_').on('scroll',function(e){
         
            let child_height = $(this).children().height();
            let parent_height = $(this).height();
         
            //console.log((child_height-parent_height)-$(this).scrollTop())
             if((child_height-parent_height)-$(this).scrollTop()<0)
             {
                 console.log('到底部了')
                 
             }
          
        });
    },
    methods:{
        
    }
}
</script>

<style scoped>
    ._page_
    {
        position: absolute;
        left:0;
        top:0;
        bottom: 0;
        right: 0;
        overflow-y: scroll;
    }
</style>