var pointsArray = document.getElementsByClassName ('point');

var revealPoint = function(points) {
  points.style.opacity = 1;
  points.style.transform = "scaleX(1) translateY(0)";
  points.style.msTransform = "scaleX(1) translateY(0)";
  points.style.WebkitTransform = "scaleX(1) translateY(0)";
}

var animatePoints = function(points) { 
  forEach(points, revealPoint);
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