$(function () {
  $('#image-file').on('change', function () {
    var reader = new FileReader();
    reader.onload = function () {
      $('#picture').attr('src', reader.result);
      showPictureView();
    }
    var file = $("#image-file").get(0).files[0];
    reader.readAsDataURL(file);
  });

  $('#upload-btn').on('click', function () {
    showLoading();
    $('#upload-btn,#cancel-btn').attr("disabled", true);
    var data = $('#picture').attr('src');
    $.ajax({
      type: "POST",
      url: "/upload",
      data: data,
      success: function(msg){
        // TODO 送信成功時の処理
        showThanksView();
        $('#upload-btn,#cancel-btn').removeAttr("disabled");
        hideLoading();
      },
      error: function (e) {
        // TODO 送信失敗時の処理
        $('#upload-btn,#cancel-btn').removeAttr("disabled");
        hideLoading();
      }
    });
  });

  $('#cancel-btn').on('click', function () {
    showIntroView();
  });
});

var showIntroView = function () {
  $('#intro-area,#camera-area').removeClass('none');
  $('#thanks-area,#picture-area').addClass('none');
};

var showPictureView = function () {
  $('#picture-area').removeClass('none');
  $('#intro-area,#thanks-area,#camera-area').addClass('none');
};

var showThanksView = function () {
  $('#thanks-area,#camera-area').removeClass('none');
  $('#intro-area,#picture-area').addClass('none');
};

var showLoading = function () {
  $('.spinner').css('visibility', 'visible');
};

var hideLoading = function () {
  $('.spinner').css('visibility', 'hidden');
};
