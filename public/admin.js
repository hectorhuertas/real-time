const socket = io();
const currentPoll = $('#poll').data('id');
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

socket.on('pollClosed', function(poll){
  console.log('poll closed');
  if (poll === currentPoll) {
    $('#status').empty().append('<h3>Poll Closed</h3>');
  }
  for(var option in poll.options){
    $("p:contains('" + option + "')").find('span').text(poll.options[option]);
  }
});

function closePoll(e) {
  console.log('closing poll');
  socket.send('closePoll', currentPoll);
}
