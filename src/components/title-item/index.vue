<template>
  <div class="_title_box">
      {{title}}
  </div>
</template>

<script>
import "./index.css"
export default {
    props:{
        title:{
            type:String,
            default:''
        }
    }
}
</script>

<style>
    
</style>