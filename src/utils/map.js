exports.arePointsNear = (checkPoint, centerPoint, km) => {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
  var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
  var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

// https://stackoverflow.com/questions/50342507/check-if-a-coordinate-is-contained-within-a-circle-in-google-maps
// https://stackoverflow.com/questions/24680247/check-if-a-latitude-and-longitude-is-within-a-circle-google-maps