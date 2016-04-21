var socket = io();

socket.on('connect', function(){
  console.log('Admin Conexion stablished');
});

socket.on('pollResults', function(poll){
  for(var option in poll.options){
    $("p:contains('" + option + "')").find('span').text(poll.options[option]);
  }
});
