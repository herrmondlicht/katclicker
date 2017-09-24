var cats = [];
if (localStorage.cats) {
    cats = JSON.parse(localStorage.cats);
} else {
    localStorage.cats = JSON.stringify([]);
}

var Cat = function(data) {
    this.image = ko.observable(data.path);
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

    this.currentCat = ko.observable(new Cat({
        path: "img/cat.jpeg",
        name: "Josh",
        timesClicked: 0,
        nicknames: ["Jojo"]
    }));
    this.incrementClick = function() {
        self.currentCat().timesClicked(self.currentCat().timesClicked() + 1);
    };
};

ko.applyBindings(new Controller());
