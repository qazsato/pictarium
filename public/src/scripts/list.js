$(function () {
  $.ajax({
    type: 'GET',
    url: '/picture/list',
    success: function(data){
      for (var i = 0; i < data.length; i++) {
        var $img = $('<img/>').attr('src', data[i]);
        $('body').append($img);
      }
    }
  });
});
