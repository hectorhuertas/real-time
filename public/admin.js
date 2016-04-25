const socket = io();
const currentPoll = $('#poll').data('id');

$(document).ready(function(){
  $('#close-poll').on('click', closePoll);
});

socket.on('connect', function(){
  console.log('Admin Conexion stablished');
  socket.send('status', 'connected');
});

socket.on('pollResults', function(poll){
  if (poll.id === currentPoll) {
    updatePoll(poll);
  }
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

  $('#vote-origins').empty();

  for(var ip in poll.votes){
    $('#vote-origins').append('<p>'+ip+': <span>'+poll.votes[ip]+'</span></p>');
    $("p:contains('" + ip + "')").find('span').text(poll.votes[ip]);
  }
}

function setPollAsClosed(poll) {
  if (poll === currentPoll) {
    $('#status').empty().append('<h3>Poll Closed</h3>');
  }
}
