<template>
  <div id="app" class="center">
    <div class="outer-box center">
      <LeftPage />
      <RightPage />
    </div>
  </div>
</template>

<script>
import LeftPage from "@/views/leftPage";
import RightPage from "@/views/rightPage";
export default {
  data() {
    return {};
  },
  components: {
    LeftPage,
    RightPage
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  border: 12px solid #CCFF99;
  box-sizing: border-box;

  .outer-box {
    width: 100%;
    height: 100%;
    padding: 8px;
    background-color: #CCFF99;
  }
}
</style>