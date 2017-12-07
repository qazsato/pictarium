<template>
  <header>
    <div class="menu">
      <i v-show="isBackButtonShow" @click="clickBack" class="material-icons">chevron_left</i>
    </div>
    <h1>pictarium</h1>
    <div class="menu">
      <i @click="clickAction" class="material-icons">{{actionIcon}}</i>
    </div>
  </header>
</template>

<script>
export default {
  props: ['actionIcon', 'actionClick'],
  data() {
    return {
      isBackButtonShow: false
    };
  },
  mounted: function() {
    const path = this.$router.history.current.path;
    this.isBackButtonShow = (path !== '/');
  },
  methods: {
    clickBack() {
      this.$router.go(-1);
    },
    clickAction() {
      this.actionClick();
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
