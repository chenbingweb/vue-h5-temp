<template>
  <div>
      <video  :src="src" width="10rem"  style="object-fit:fill;width:10rem" x-webkit-airplay
                :poster="poster" controls x5-playsinline playsinline="true" ref="video">
            </video>
  </div>
</template>

<script>
export default {
    props:{
        src:{
            type:String,
            default:''
        },
        poster:{
            type:String,
            default:''
        }
    }
}
</script>

<style>

</style>