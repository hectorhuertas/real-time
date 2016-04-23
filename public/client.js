const socket = io();
$(document).ready(function(){
  $('#poll').on('click', generatePoll);
  $('#time').val(moment().add(10,'second').format('HH:mm:ss'));
  $('#date').val(moment().format('YYYY-MM-DD'));
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
    three: $('#three').val(),
     deadline: deadline()
  };
}

function deadline() {
  var inputTime = $('#date').val() + ' ' + $('#time').val();
  return moment(inputTime).utc().unix();
}

function showLinks(links){
  $('#links').empty().append(
    '<p>Admin View: <a href="' + links.admin +'">' + links.admin + '</a></p>' +
    '<p>Voting Page: <a href="' + links.voting +'">' + links.voting + '</a></p>'
  );
}
