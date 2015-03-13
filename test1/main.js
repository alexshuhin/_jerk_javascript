console.log('Hello wrot!');

a = 5;
console.log(a == window.a);
var b = 10;
console.log(b == window.b);

function func(arg1) {
  console.log(this);
  console.log(arg1);
}

var obj = { test_var: 123 };
window.func.call(obj, 'hello');

/////////////

function sum(a, b) {
  return a + b;
}

console.log(sum(5, 7));

// suma(20); // a = 15 => 35

function construct_new_sum(a) {
  return function(b) {
    return sum(a, b);
  }
}

suma = construct_new_sum(15);
console.log(suma(20));

//////////////

window.c = 5;

function FakeClass(a) {
  if (a != undefined) {
    this.a = a;
  }
}

//FakeClass.prototype.sum = function() {
  //debugger;
  //return this.a + b;
//}

//FakeClass.prototype.a = 10; // Дефолтное значение на случай если мы не определим в кострукторе
FakeClass.prototype = {
  hello: function() {
    console.log(this.a + ' wrot!');
  },
  world: function() {
    console.log('Hello ' + this.a);
  }
}

fake_class = new FakeClass;

// TRUE
//console.log(fake_class.sum(1)); // 16
//console.log(FakeClass.prototype.sum(2)); // 7
//console.log(fake_class.sum.call(this, 3)); // 8

///////////////////

// Все блять одно и то же
var func = function() {}
func = function() {}
function func() {}


///////////////////
a = 1;
b = 2;

function context_test() {
  var a = 5;
  b = 10;

  function inner_func() {
    console.log(window.a); // 1
    console.log(window.b); // 10
  }

  inner_func();
}


//////////////////// OBSERVER

Observer = {
  events: {},

  on: function(evname, func) {
    if (!Observer.events[evname]) {
      Observer.events[evname] = [];
    }

    Observer.events[evname].push(func);
  },

  trigger: function(obj, evname) {
    var events = Observer.events[evname];
    if (!events)
      return;
    for (i = 0; i < events.length; i++) {
      var func = events[i];
      var args = Array.prototype.slice.call(arguments, 2);
      func.apply(obj, args);
    }
  }
}

function TestClass(name) {
  this.name = name;
  this.a = 0;
}

TestClass.prototype = {
  change: function(a) {
    this.a = a;
    Observer.trigger(this, 'changed', this.a); // call event1 of observer
  },

  succ: function() {
    this.a++;
    Observer.trigger(this, 'incremented', this.a); // call event1 of observer
  }
}

obj_vasia = new TestClass('Vasia');
obj_petya = new TestClass('Petya');
Observer.on('changed', function(a) { console.log("Changed! New value " + a + " for " + this.name) });
Observer.on('incremented', function(a) { console.log('Incremented! New value ' + a + ' for ' + this.name) });
//Observer.on('on', function() { console.log('event "on"') });

obj_vasia.change(10);
obj_petya.succ();
//obj.trigger_event('event1'); // call event1 of observer
//obj.trigger_event('event2'); // call event2 of observer
//obj.trigger_event('on'); // call event3 of observer

////////////////////////////////////////////////////////////////

// Неработающая фигня - почему?
Array.prototype.hueach = function(func) {
  for (i = 0; i < this.length; i++) {
    func(this[i]);
  }
}

[1,2,3,4,5].hueach(function(e) {
  console.log(e);
})

console.log('Вышел Кирилл покурять!')
