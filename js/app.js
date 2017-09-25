//array de gatos
var cats = [
    {image:"img/cat.jpeg",name:"Gerônimo",nicknames:["Gê","Mimo"],timesClicked:0},
    {image:"img/cat2.jpeg",name:"Arlindo",nicknames:["Lê","Arizinho"],timesClicked:0},
    {image:"img/cat3.jpeg",name:"Preguiça",nicknames:["Levinho","Etc"],timesClicked:0}
];

//objeto que cria um gato à partir dos dados passados
var Cat = function(data) {
    this.image = ko.observable(data.image);
    this.catName = ko.observable(data.name);
    this.timesClicked = ko.observable(data.timesClicked);
    this.nicknames = ko.observableArray(data.nicknames);
    this.catLevel = ko.computed(function() {
        var clicks = this.timesClicked();
        if (clicks < 50) return "Noob";
        else if (clicks < 100) return "Intermediário";
        else return "Avançado";
    }, this);
};

var Controller = function() {
    var self = this;
    this.catList = ko.observableArray([]);
    cats.forEach(function(obj){
        self.catList.push(new Cat(obj));
    });
    this.currentCat = ko.observable(this.catList()[0]);
    this.incrementClick = function() {
        self.currentCat().timesClicked(self.currentCat().timesClicked() + 1);
    };
    this.setCurrentCat = function(){
        self.currentCat(this);
    }
};

ko.applyBindings(new Controller());
