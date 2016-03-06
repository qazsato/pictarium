$(function () {
  // 写真選択時
  $('#image-file').on('change', function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // MEMO iOS端末だと画像向きが変わってしまうため、EXIF情報から適切な向きに変換する。
      EXIF.getData(file, function(){
        var orientation = file.exifdata.Orientation;
        var image = new Image();
        image.src = reader.result;
        image.onload = function() {
          $('#picture').attr('src', resizeImage(this, orientation, 0.5));
          showPictureView();
        };
      });
    };
  });

  // 写真送信時
  $('#upload-btn').on('click', function () {
    showLoading();
    $.ajax({
      type: 'POST',
      url: '/picture/regist',
      data: {src: $('#picture').attr('src')},
      success: function(msg){
        // TODO 送信成功時の処理
        hideLoading();
        showThanksView();
      },
      error: function (e) {
        // TODO 送信失敗時の処理
        hideLoading();
      }
    });
  });

  // 写真送信キャンセル時
  $('#cancel-btn').on('click', function () {
    showIntroView();
  });
});

/**
 * 写真をリサイズします。
 * スマホの写真は数MBを軽く超えるので、アップロード時の負荷軽減のためリサイズ実施。
 * @param  {Image} image Imageオブジェクト
 * @param  {Number} orientation EXIFの画像向き情報(1-8)
 * @param  {Number} scale リサイズ値(0-1)
 * @return {String}       Base64
 */
var resizeImage = function (image, orientation, scale) {
  var canvas = document.createElement('canvas');
  var width = image.width * scale;
  var height = image.height * scale;
  if (orientation === 6) {
    canvas.width = height;
    canvas.height = width;
  } else {
    canvas.width = width;
    canvas.height = height;
  }
  var context = canvas.getContext('2d');
  if (orientation === 6) {
    // 時計回りに90度回転
    context.rotate(90 * Math.PI / 180);
    context.translate(0, -1 * height);
  }
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL();
};

/**
 * 導入画面を表示します。
 */
var showIntroView = function () {
  $('#intro-area,#camera-area').removeClass('none');
  $('#thanks-area,#picture-area').addClass('none');
};

/**
 * 送信画面を表示します。
 */
var showPictureView = function () {
  $('#picture-area').removeClass('none');
  $('#intro-area,#thanks-area,#camera-area').addClass('none');
};

/**
 * 完了画面を表示します。
 */
var showThanksView = function () {
  $('#thanks-area,#camera-area').removeClass('none');
  $('#intro-area,#picture-area').addClass('none');
};

/**
 * 写真送信時のローディングを表示します。
 */
var showLoading = function () {
  $('.spinner').css('visibility', 'visible');
  $('#upload-btn,#cancel-btn').attr('disabled', true);
};

/**
 * 写真送信時のローディングを非表示にします。
 */
var hideLoading = function () {
  $('.spinner').css('visibility', 'hidden');
  $('#upload-btn,#cancel-btn').removeAttr('disabled');
};
