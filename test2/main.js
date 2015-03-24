function main()
{
  // Ебём мозг, если всё неявно или даже что-нибудь одно
  "use strict"

  var obj_no_obj = {
    func: function() {
      console.log('inside obj', this);
    }
  };
  
  //   === ...
  var obj = new Object(); 

  // ...
  obj.func2 = function() {
    console.log('inside obj', this);
  }

  obj.constructor.prototype.func1 = function() {
    console.log('inside obj', this);
  }

  obj_no_obj.func();
  obj.func1();
  obj.func2();

  // Dog is kind of Object & inherits all its prototype methods
  var Dog = function(dohuya_vsego) {
    this.name = "Vasik";
    this.surname = dohuya_vsego.surname;
    //this += {name: name};
    console.log(this);
  }
//  Dog.func1(); // this inside func1 == Dog where is class

  var dog = new Dog({surname: 'Petrovich'});
//  dog.func1(); // this inside func1 == dog

  var str = "Hello";
  console.log(str);

  console.log(/g/.constructor === RegExp);


  ////////// ЕБАТЬ КАШЕРНОЕ ЗАМЫКАНИЕ КОНТЕКСТА ДЛЯ ЛЯМБД и ВСЯКИХ ТАМ thisхЖцхррх
  Array.prototype.sobaka = "Petrovich";
  Array.prototype.each = function(func) {
    for (var i = 0; i < this.length; i++) {
      func(this[i]);
    }
  }

  var myObj = {
    name: 'Vasia',
    func: function() {
      var arr = [1,2,3];
      var self = this; // this НЕ ЗАМЫКАТЕСЯ
      arr.each(function(el) {
        //console.log(this);
        debugger; // try dump this and enjoy %)
        console.log(el + " " + self.name + " " + arr.sobaka);
      });
    }
  }

  myObj.func(); // === myObj.func.call(myObj)

  ///// Becouse onload rebinds context
  // this is strashnye C++ or ASM debrie
  var testFunc = function() {
    console.log(this);
  }
  testFunc(); // === testFunc()
}
