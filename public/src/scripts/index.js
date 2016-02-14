$(function () {
  $('#image-file').on('change', function () {
    var reader = new FileReader();
    reader.onload = function () {
      $('#picture').attr('src', reader.result);
      $('#picture-area').show();
      $('#intro-area,#thanks-area,#camera-area').hide();
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
        $('#thanks-area,#camera-area').show();
        $('#intro-area,#picture-area').hide();
        $('#upload-btn,#cancel-btn').removeAttr("disabled");
        // hideLoading();
      },
      error: function (e) {
        // TODO 送信失敗時の処理
        $('#upload-btn,#cancel-btn').removeAttr("disabled");
        hideLoading();
      }
    });
  });

  $('#cancel-btn').on('click', function () {
    $('#intro-area,#camera-area').show();
    $('#thanks-area,#picture-area').hide();
  });
});

var showLoading = function () {
  $('.spinner').html('<div class="mdl-spinner mdl-js-spinner is-active is-upgraded" data-upgraded=",MaterialSpinner"><div class="mdl-spinner__layer mdl-spinner__layer-1"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-2"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-3"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div><div class="mdl-spinner__layer mdl-spinner__layer-4"><div class="mdl-spinner__circle-clipper mdl-spinner__left"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__gap-patch"><div class="mdl-spinner__circle"></div></div><div class="mdl-spinner__circle-clipper mdl-spinner__right"><div class="mdl-spinner__circle"></div></div></div></div>');
};

var hideLoading = function () {
  $('.spinner').empty();
};
