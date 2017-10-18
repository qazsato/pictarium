<template>
  <div id="app">
    <div id="intro-area">
      <h3>Please your photo.</h3><i class="material-icons">insert_photo</i>
    </div>
    <div id="picture-area" class="none">
      <div class="picture-background"><img id="picture" width="80%"/></div>
      <div class="spinner">
        <div class="mdl-spinner mdl-js-spinner is-active"></div>
      </div>
      <el-button type="primary">送信</el-button>
      <el-button>キャンセル</el-button>
    </div>
    <div id="thanks-area" class="none">
      <h3>Thank you so much.</h3><i class="material-icons">favorite</i>
    </div>
    <div id="camera-area">
      <button id="camera-btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">photo_camera</i>
        <input id="image-file" type="file" accept="image/*"/>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  html,body {
    color: white;
    background-color: rgb(63,81,181);
  }

  .none {
    display: none;
  }

  .mdl-button--raised {
    background: white;
  }

  #intro-area {
    padding: 20px 0;
    text-align: center;
  }

  #intro-area h3 {
    margin: 24px 20px;
  }

  #intro-area .material-icons {
    font-size: 300px;
  }

  #picture-area {
    padding: 20px 0;
    text-align: center;
  }

  #picture-area .picture-background {
    padding: 20px 0 10px 0;
  }

  #picture-area .spinner {
    visibility: hidden;
  }

  #picture-area .mdl-button {
    width: 120px;
    margin: 10px 15px 60px 15px;
  }

  #thanks-area {
    padding: 20px 0;
    text-align: center;
  }

  #thanks-area h3 {
    margin: 24px 20px;
  }

  #thanks-area .material-icons {
    font-size: 300px;
  }

  #camera-area {
    width: 100%;
    position: absolute;
    bottom: 5%;
    text-align: center;
  }

  #camera-btn {
    position: relative;
  }

  #image-file {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width:  100%;
    opacity: 0;
  }

  @-webkit-keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }

  .fadeOutUp {
    -webkit-animation-name: fadeOutUp;
    animation-name: fadeOutUp;
  }
</style>
