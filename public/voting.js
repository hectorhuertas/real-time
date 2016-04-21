var socket = io();
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

function vote(e){
  const id = $('#poll').data('id');
  const value = e.target.id;
  const vote = {pollId:id, value: value};
  socket.send('newVote', vote);
  console.log('Votando ' + e.target.id);
}
