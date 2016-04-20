var socket = io();
$(document).ready(function(){
  $('#poll').on('click', generatePoll);
});

function generatePoll(){
  var title = $('#title').val();
  var one   = $('#one').val();
  var two   = $('#two').val();
  var three = $('#three').val();

  var poll = {
    title: title,
    one: one,
    two: two,
    three: three
  };
  console.log(poll);
  socket.send('newPoll', poll);
}

  socket.on('connect', function(){
    console.log('Conexion stablished');
  });

  socket.on('newLinks', function(links){
    console.log('Conexion stablished');
    $('#links').empty().append('<p>Admin View: ' + links.admin + '</p>' +
    '<p>Voting Page: ' + links.voting + '</p>' );
  });
