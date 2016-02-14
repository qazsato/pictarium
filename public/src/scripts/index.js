$(function () {
  $('#image-file').on('change', function () {
    var reader = new FileReader();
    reader.onload = function () {
      $('#picture').attr('src', reader.result);
      $('#picture-area').show();
      $('#intro-area,#thanks-area').hide();
    }
    var file = $("#image-file").get(0).files[0];
    reader.readAsDataURL(file);
  });

  $('#upload-btn').on('click', function () {
    var $btn = $(this);
    $btn.attr("disabled", true);
    var data = $('#picture').attr('src');
    $.ajax({
      type: "POST",
      url: "/upload",
      data: data,
      success: function(msg){
        // TODO 送信成功時の処理
        $('#thanks-area').show();
        $('#intro-area,#picture-area').hide();
        $btn.removeAttr("disabled");
      },
      error: function (e) {
        // TODO 送信失敗時の処理
        $btn.removeAttr("disabled");
      }
    });

  });
});
