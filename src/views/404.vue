<template>
  <div class="not-found">
    <img src="@/assets/404.gif" alt="" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "404",
});
</script>
<style scoped>
.not-found {
  width: 100%;
  height: 100%;
}
.not-found img {
  width: 100%;
}
</style>