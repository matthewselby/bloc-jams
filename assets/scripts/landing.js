var animatePoints = function() {
  var revealPoint = function() {
    $(this).css({
      opacity:1,
      transform:'scaleX(1) translateY(0)'
    });
  };
  $.each($('.point'), revealPoint);
};

$(window).load(function() {
  //  #1
  // conditionally animate the points if the viewport "window" is tall enough to view them
  if ($(window).height() > 950) {
    animatePoints();
  }

  // #2
  // getting the distance between the selling points and the top of the page...and + 200px
  var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

  // #3
  // triggers the points to animate if smaller screen and scrollign to 200px above the selling points
  $(window).scroll(function(event) {
    if ($(window).scrollTop() >= scrollDistance) {
      animatePoints();
    }
  });
});