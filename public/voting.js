const socket = io();
const currentPoll = $('#poll').data('id');

$(document).ready(function(){
  $('.voter').on('click', vote);
});

socket.on('connect', function(){
  console.log('Voting Conexion stablished');
});

socket.on('yourVote', function(vote){
  $('#yourVote').text('Your vote: ' + vote);
});

socket.on('pollClosed', function(poll){
  setPollAsClosed(poll);
});

function vote(e){
  socket.send('newVote', {pollId:currentPoll, value: e.target.id});
}

function setPollAsClosed(poll) {
  if (poll === currentPoll) {
    $('#poll-options').empty().append('<h3>Poll Closed</h3>');
  }
}
