<template>
  <button class="subDialogButton">{{ text }}</button>
</template>

<script>
export default {
    name: "SubDialogButton",
    props: ["text"]
}
</script>

<style>
    @import url(@/css/main.css);
</style>