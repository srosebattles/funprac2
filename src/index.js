// using our own forEach(), map(), reduce(), and filter()
// functions written in js-functions-functional-practice-1
//imported functions are right here:
//forEach
function forEach(array, callback){
  for(var i=0; i < array.length; i++) {
  callback(array[i], i, array);
}
}
//reduce
function reduce(array, callback, initialValue){
  var accumulator;
  forEach(array, function(value,i,originalArray) {
    if(i === 0) {
      accumulator = initialValue
    }
      accumulator = callback(accumulator, value)

  })
  return accumulator
}
//map
function map(array, callback){
  var mappedArray = []

    forEach(array, function(value,i,originalArray){
      mappedArray.push(callback(value, i, originalArray))
    })
    return mappedArray
}
//filter
function filter(array, callback){
    var filteredArray = []
    reduce(array, function(a, v, i, originalArray){
      var tracked = callback(v, i, originalArray)
      if(tracked){
        filteredArray.push(v)
      }
    })
    return filteredArray
}

// -----------
// Write a function pluck() that extracts a list of
// values associated with property names.
// -----------
function pluck(list, propertyName) {
  var new_array = list.map(function( v, i ){
             return v[propertyName];
   })
        return new_array;
}

// tests
// ---
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
//console.log(pluck(stooges, "name"))
console.assert(pluck(stooges, 'name')[0] === 'moe')
console.assert(pluck(stooges, 'age')[2] === 60)

// -----------
// Write a function reject() that does the opposite of filter,
// if the callback function returns a "truthy" value then that
// item is **not** inserted into the new collection,
// otherwise it is.
// -----------
function reject(list, predicate) {
     //var rejectedArray = []
     return filter(list, function(v, i, originalArray){
       var correct = predicate(v, i, originalArray)
       if(!correct){
         //rejectedArray.push(v)
         return true
       }

     })

    // return list.filter(function(v, i){
    //   return !predicate(v)
    // })
}

// tests
// ---
var lt10 = [0,1,2,3,4,5,6,7,8,9,10]
var odds = reject(lt10, function(n){ return n%2 === 0 })
console.log(odds[0])
console.assert(odds[0] === 1)
console.assert(odds[1] === 3)
console.assert(odds[4] === 9)

// -----------
// Write a function find() that returns the very first item
// in a collection when the callback function returns true;
// otherwise returns undefined.
// -----------
function find(list, predicate) {

    return reduce(list, function(a, v, i, originalArray){
       var found = predicate(v, i, originalArray)
       if(found){
          return v
      }

        else {
          return a
        }
     })
}

// tests
// ---
var people = [
    {name: "Matt", teaches: "JS"},
    {name: "Jwo", teaches: "Ruby"},
    {name: "Dorton", teaches: "life"}
]
var JS = find(people, function(n){ return n.teaches === "JS" })
console.log(JS.name)
console.assert(JS.name === "Matt")

// -----------
// Write a function where() that filters for all the values
// in the properties object.
// -----------
//use in loop
function where(list, properties) {


    return reject(list, function(v) {
      var shouldRejectItem = false;
      for (key in properties) {
        if (properties[key] !== v[key]) {
          //console.log(v[key])
          //console.log("match found")
          shouldRejectItem = true;
        }
      }
        return shouldRejectItem;
    })
}

// tests
// ---
var plays = [
    //{title: "Cymbeline", author: "Shakespeare", year: 1623},
    {title: "Cymbeline", author: "Shakespeare", year: 1623},
    {title: "The Tempest", author: "Shakespeare", year: 1623},
    {title: "Hamlet", author: "Shakespeare", year: 1603},
    {title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600},
    {title: "Macbeth", author: "Shakespeare", year: 1620},
    {title: "Death of a Salesman", author: "Arthur Miller", year: 1949},
    {title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949}
]

var sh8spr = where(plays, {author: "Shakespeare"})
console.log(sh8spr)
console.assert(sh8spr instanceof Array)
console.assert(sh8spr.length === 5)
console.assert(sh8spr[0].title === "Cymbeline")

sh8spr = where(plays, {author: "Shakespeare", year: 1611})
console.assert(sh8spr.length === 0)

sh8spr = where(plays, {author: "Shakespeare", year: 1623})
console.assert(sh8spr.length === 2)

var midcentury = where(plays, {year: 1949})
console.assert(midcentury.length === 2)

//in class example
// var users = {
//   jimthedev: '@jimthedev';
//   bill: '@billnotwitter';
//   jenessa: '@jnessview';
// }
// for (key in users) {
//   obj(key);
//   users[key]
//   obj(users[key]);
// }
