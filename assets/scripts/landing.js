var pointsArray = document.getElementsByClassName ('point');

var animatePoints = function(points) { 
  var revealPoint = function(index) {
    points[index].style.opacity = 1;
    points[index].style.transform = "scaleX(1) translateY(0)";
    points[index].style.msTransform = "scaleX(1) translateY(0)";
    points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
  }

  for (var i = 0; i < points.length; i++) {
      revealPoint(i);
  }
};

window.onload = function() {
  // animate if screen is large enough to display all points
  if (window.innerHeight > 950) {
    animatePoints(pointsArray);
  }
  var sellingPoints = document.getElementsByClassName('selling-points')[0];
  // getting the distance between the sellingPoints section and the top of the page + 200px
  var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
  window.addEventListener("scroll", function(event) {
    if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
      animatePoints(pointsArray);
    }
  })
}