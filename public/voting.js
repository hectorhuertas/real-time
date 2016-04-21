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
  console.log('voto recibido');
});

socket.on('pollClosed', function(poll){
  if (poll === currentPoll) {
    $('#poll-options').empty().append('<h3>Poll Closed</h3>');
  }
});

function vote(e){
  const id = currentPoll;
  const value = e.target.id;
  const vote = {pollId:id, value: value};
  socket.send('newVote', vote);
  console.log('Votando ' + e.target.id);
}
