<template>
  <div class="card">
    HelloWorld
  </div>
</template>

<script setup lang="ts">

async function readfile() {
    console.time()
    let data = await  Neutralino.filesystem.readBinaryFile('/Users/zane/Desktop/小米办公20230210-154041.mp4')
    console.timeEnd()
    console.log(555,data)
}

readfile()

</script>



<style scoped>
.read-the-docs {
  color: #888;
}
</style>
