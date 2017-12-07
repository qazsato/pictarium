<template>
  <header>
    <div class="menu">
      <i @click="clickLeftIcon" class="material-icons">{{leftIcon}}</i>
    </div>
    <h1>pictarium</h1>
    <div class="menu">
      <i @click="clickRightIcon" class="material-icons">{{rightIcon}}</i>
    </div>
  </header>
</template>

<script>
export default {
  props: ['leftIcon', 'rightIcon', 'leftClick', 'rightClick'],
  data() {
    return {
      isBackButtonShow: false,
      isPhotoButtonShow: false
    };
  },
  mounted: function() {
    const path = this.$router.history.current.path;
    if (path === '/') {
      this.isPhotoButtonShow = true;
    } else if (path === '/photo') {
      this.isBackButtonShow = true;
    }
  },
  methods: {
    clickLeftIcon() {
      this.leftClick();
    },
    clickRightIcon() {
      this.rightClick();
    }
  }
}
</script>


<style lang="postcss" scoped>
  header {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  h1 {
    flex: 1;
    margin: 0;
    color: #4c4c4c;
    font-size: 24px;
    text-align: center;
  }

  .menu {
    margin: 10px;
    width: 30px;
    height: 30px;
  }

  .material-icons {
    color: #ff5555;
    font-size: 28px;
    cursor: pointer;
  }

  .material-icons:hover {
    color: #ff2222;
  }
</style>
