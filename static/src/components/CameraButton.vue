<template>
  <el-button id="camera-button" :class="{'slide-in-up':isShow === true, 'slide-in-down':isShow === false}">
    <div class="camera-text">撮影する</div>
    <i class="camera-icon material-icons">photo_camera</i>
    <input type="file" @change="onFileChange" accept="image/*" multiple>
  </el-button>
</template>

<script>
export default {
  props: ['onSelectImage', 'isShow'],
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.onSelectImage(files);
      e.target.value = '';  // NOTE 同一ファイルの選択イベント発火を検知できるよう初期状態にする。
    }
  }
}
</script>

<style lang="postcss">
  .slide-in-up,
  .slide-in-down {
    animation-duration: .2s;
    animation-fill-mode: both;
  }

  @keyframes slide-in-up {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  }

  .slide-in-up {
    animation-name: "slide-in-up";
  }

  @keyframes slide-in-down {
    from {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 100%, 0);
      visibility: hidden;
    }
  }

  .slide-in-down {
    animation-name: "slide-in-down";
  }
</style>


<style lang="postcss" scoped>
  #camera-button {
    position: fixed;
    bottom: 8px;
    right: 8px;
    height: 80px;
    width: 80px;
    padding: 0;
    border: none;
    border-radius: 50%;
    color: #fff;
    background-color: #ff5555;
    box-shadow: 0px 0px 26px -8px rgba(0, 0, 0, 0.7);
  }

  #camera-button:hover {
    background-color: #ff2222;
  }

  .camera-text {
    margin: 12px 0 2px 0;
    font-size: 13px;
  }

  .camera-icon {
    font-size: 32px;
  }

  #camera-button input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width:  100%;
    opacity: 0;
  }
</style>
