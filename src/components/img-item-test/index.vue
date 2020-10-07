<template>
  <div class="_img_imgs_box">
      <div  class="_img_move_bg">
         
      </div>
  </div>
</template>

<script>

export default {
    mounted(){
        this.cw =  document.body.clientWidt;
        this.ch = document.body.clientHeight;
        
    },
    data(){
        return {
            img:imgs
        }
    }
    
}
</script>

<style>
    ._img_imgs_box
    {
        position: fixed;
        left: 0;
        top:0;
        right: 0;
        bottom: 0;
        background: red;
        z-index: 999;
    }
    ._img_move_bg
    {
        /* width: 100%;
        height: 100%;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        background: url("../../assets/11.jpg") no-repeat left center;
        background-size: 100%; */
    }
    ._img_img_item
    {
        height: 100%;
    }
</style>