$(function () {
  var pictArray = [];
  var pictNum = 0;

  // 画像データ取得
  setInterval(function () {
    $.ajax({
      type: 'GET',
      url: '/picture/get',
      success: function(data){
        pictArray = data;
      },
      error: function (e) {
      }
    });
  }, 10000);

  // 画像データ表示
  setInterval(function () {
    $('img')
      .attr('src', pictArray[pictNum])
      .animation('fadeIn');
    if (pictNum < pictArray.length) {
      pictNum++;
    } else {
      pictNum = 0;
    }
  }, 5000);
});
