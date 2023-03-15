<template>
  <button class="dialogButton">{{ text }}</button>
</template>

<script>
export default {
    name: "DialogButton",
    props:["text"]
}
</script>

<style>
    @import url(@/css/main.css);
</style>