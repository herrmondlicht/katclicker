var Controller = function(){
    this.image = ko.observable("img/cat.jpeg");
    this.catName = ko.observable("Josh");
    this.timesClicked = ko.observable(0);
    this.incrementClick = function(){
        this.timesClicked(this.timesClicked() +1);
    };
    this.catLevel = function(){
        var clicks = this.timesClicked();
        if(clicks<50) return "Novinho";
        else if(clicks<100) return "Intermediário";
        else return "Fodelão";
    }
};

ko.applyBindings(new Controller());
