var app = new Framework7({
  // App root element
  el: '#app',
  // ... other parameters
});
var mainView = app.views.create('.view-main')

//for acess and modification we use jquery
//for rules, we use basic javascript


//water level tredsh
var waterlevel = 20;
var nowater = 0;
var drowning = 40;

//nutrition
var food = 30;
var nofood = 0;
var overfeed = 40;

var neardeath = false;
var trimmed = false;

function dryout() {
  waterlevel--;
  console.log(waterlevel);
  checkhealth();
  var watertimer = setTimeout(dryout, 500);
}
dryout();

function starving() {
  food--;
  // console.log(food);
  checkhealth();
  var foodtimer = setTimeout(starving, 500)
}
starving();

function checkhealth() {
  if (waterlevel <= nowater || waterlevel >= drowning || food <= nofood) {
    neardeath = true;
    console.log("help!")
    $("#plant path").css("fill", "chocolate")
  }
  if (neardeath && waterlevel > nowater) {
    $("#plant path").css("fill", "#568b62")
    neardeath = false;
    setTimeout(function () {
    $("#trim").fadeIn();
    trimmed = false;
    }, 5000)
  }

}


//event listiners

//add water to existing value
$("#water-me").on("click", function () {
  // waterlevel = waterlevel + 20
  waterlevel += 20;
  $("#water").fadeIn().delay(3000).fadeOut()
})


$("#feed-me").on("click", function () {
  food += 20;
  $("#food").fadeIn().delay(3000).fadeOut()
})


$("#trim-me").on("click", function () {
trimmed = true;
$("#scissors").fadeIn().delay(3000).fadeOut();
$("#trim").fadeOut();

})







// by default:
// - plants starts healthy
// - dry out over time
// - deplete in nutrients over time

// interactipons:
// - water it, replenish the plant
// - feed it, nutrients for the plant
// - trim it

// care:
// - too much water, plant near death
// - too much fertilizer, plant near death
// - if the plant falls into a near death state, you can only heal it by
// trimming it