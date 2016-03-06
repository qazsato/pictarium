var pictArray = [];
$(function () {
  $.ajax({
    type: 'GET',
    url: '/picture/get',
    success: function(data){
      pictArray = data;
      $('img').attr('src', pictArray[pictArray.length - 1]);
    },
    error: function (e) {
    }
  });
});
