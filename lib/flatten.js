function flatten(array) {
  return array.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

module.exports = flatten;
