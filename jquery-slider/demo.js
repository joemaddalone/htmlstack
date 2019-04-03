$(function () {
  $('#s1').slideIt(); //zero configuration

  $('#s2').slideIt({
    'interval': 1000,
    'showNumbers': false
  }); //interval set to 1000ms, no numbers

  $('#s3').slideIt({
    'orientation': 'vertical'
  }); //vertical orientation

  $('#s4').slideIt({
    'showNumbers': false
  }); //no numbers, no auto scroll

  $('#s5').slideIt({
    'showNumbers': false
  }); //no numbers, no auto scroll

  $('#s6').slideIt({
    'auto': false,
    'animate': false,
    'showNumbers': false
  }); //no numbers, no auto scroll

  $('#s7').slideIt({
    'auto': false,
    'hover': true,
    'animate': false,
    'showNumbers': false
  }); //no numbers, no auto scroll
});