$(function () {
  var FETCH_INTERVAL_TIME = 10000;
  var SHOW_INTERVAL_TIME = 8000;
  var pictArray = [];
  var pictNum = 0;

  // 画像データ取得
  setInterval(function () {
    $.ajax({
      type: 'GET',
      url: '/picture/count',
      success: function(count){
        var diffNum = count - pictArray.length;
        // 差分画像取得
        for (var i = 0; i < diffNum; i++) {
          $.ajax({
            type: 'GET',
            url: '/picture',
            data: {no : pictArray.length + i},
            success: function(data){
              pictArray.push(data);
            }
          });
        }
      }
    });
  }, FETCH_INTERVAL_TIME);

  // 画像データ表示
  setInterval(function () {
    pictNum = (pictNum < pictArray.length - 1) ? pictNum + 1 : 0;
    $('img')
      .attr('src', pictArray[pictNum])
      .animation('fadeIn');
  }, SHOW_INTERVAL_TIME);
});
