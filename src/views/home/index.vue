<template>
  <div id="home" class="center">
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
#home {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .outer-box {
    width: 100%;
    height: 100%;
    background-color: #ccff99;
    box-sizing: border-box;
    padding: 8px;
  }
}
</style>