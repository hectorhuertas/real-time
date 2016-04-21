var socket = io();
$(document).ready(function(){
  $('#close-poll').on('click', closePoll);
});

socket.on('connect', function(){
  console.log('Admin Conexion stablished');
});

socket.on('pollResults', function(poll){
  for(var option in poll.options){
    $("p:contains('" + option + "')").find('span').text(poll.options[option]);
  }
});

function closePoll(e) {
  console.log('closing poll');
  socket.send('closePoll', $('#poll').data('id'));
}
