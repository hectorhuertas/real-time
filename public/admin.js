const socket = io();
const currentPoll = $('#poll').data('id');

$(document).ready(function(){
  $('#close-poll').on('click', closePoll);
});

socket.on('connect', function(){
  console.log('Admin Conexion stablished');
});

socket.on('pollResults', function(poll){
  updatePoll(poll);
});

socket.on('pollClosed', function(poll){
  setPollAsClosed(poll);
});

function closePoll(e) {
  socket.send('closePoll', currentPoll);
}

function updatePoll(poll) {
  for(var option in poll.options){
    $("p:contains('" + option + "')").find('span').text(poll.options[option]);
  }
}

function setPollAsClosed(poll) {
  if (poll === currentPoll) {
    $('#status').empty().append('<h3>Poll Closed</h3>');
  }
}
