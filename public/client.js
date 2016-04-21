const socket = io();

$(document).ready(function(){
  $('#poll').on('click', generatePoll);
});

function generatePoll(){
  socket.send('newPoll', pollData());
}

socket.on('connect', function(){
  console.log('Conexion stablished');
});

socket.on('newLinks', function(links){
  showLinks(links);
});

function pollData(){
  return {
    title: $('#title').val(),
      one: $('#one').val(),
      two: $('#two').val(),
    three: $('#three').val()
  };
}

function showLinks(links){
  $('#links').empty().append(
    '<p>Admin View: <a href="' + links.admin +'">' + links.admin + '</a></p>' +
    '<p>Voting Page: <a href="' + links.voting +'">' + links.voting + '</a></p>'
  );
}
