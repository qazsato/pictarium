<template>
  <div id="app">
    <img v-show="uploadedImage" :src="uploadedImage"/>
    <input type="file" @change="onFileChange">
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      uploadedImage: '',
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
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
