$(document).ready(function(){
  $('#poll').on('click', generatePoll);
  startSockets();
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
}

function startSockets(){
  var socket = io();

  socket.on('connect', function(){
    console.log('Conexion stablished');
  });
}
