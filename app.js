var cats = [];
var model = {
    selectedCat: {},
    add: function add(object) {
        if (!object.hasOwnProperty("clicks")) {
            object.clicks = 0;
        }
        var Cats = JSON.parse(localStorage.cats);
        Cats.push(object);
        console.log(Cats);
        localStorage.cats = JSON.stringify(Cats);
    },
    update: function (object) {
        var Cats = JSON.parse(localStorage.cats);
        Cats = Cats.map(function (e) {
            if (e.name == object.name) {
                console.log("é o objeto");
                e = object;
            }
            return e;
        });
        localStorage.cats = JSON.stringify(Cats);
    },
    exists: function (object) {
        var Cats = JSON.parse(localStorage.cats);
        var catResult = Cats.filter(function (obj) {
            return object.name == obj.name;
        });
        if (catResult.length > 0) {
            return true;
        }
    },
    fetchAll: function () {
        var Cats = JSON.parse(localStorage.cats);
        return Cats;
    },
    init: function () {
        if (!localStorage.cats) {
            localStorage.cats = JSON.stringify([]);
        }
    }

};

var formController = {
    addCat: function (catName, catPath) {

        var newCat = {
            name: catName,
            path: catPath,
            clicks: 0,
        }
        if (model.exists(newCat)) {
            return;
        } else {
            model.add(newCat);
        }

        listView.render();

    },
    init: function () {
        formView.init();
    }
}

var formView = {
    init: function () {
        this.container = document.getElementById("container");
        var adminButton = document.getElementById("btnAdmin");
        var catName = document.getElementById("txtCatName");
        var catPath = document.getElementById("txtCatPath");
        var button = document.getElementById("btnAdd");


        adminButton.addEventListener("click", function () {
            if (this.container.classList.contains("hidden")) {
                this.container.classList.remove("hidden");
                // adminButton.classList.add("hidden");
            }
            else {
                this.container.classList.add("hidden");
                // adminButton.classList.add("hidden");

            }
        }.bind(this));
        button.addEventListener('click', function () {
            formController.addCat(catName.value, catPath.value);
        });
    },
    render: function () {

    }
}

//parte da lista

var controller = {
    getCats: function () {
        return model.fetchAll();
    },
    getSelectedCat: function () {
        return model.selectedCat;
    },
    selectCat: function (object) {
        model.selectedCat = object;
        selectedCatView.render();
    },
    catClick: function () {
        var object = model.selectedCat;
        object.clicks += 1;
        model.update(object);
        selectedCatView.render(object);
    },
    init: function () {
        model.init();
        selectedCatView.init();
        listView.render();
    }

};

var listView = {
    render: function () {
        //cria elementos
        var currentCat, divElement, liElement, imageDOM, globalList = document.getElementById("catlist");

        var cats = controller.getCats();
        globalList.innerHTML = "";
        for (var i = 0; i < cats.length; i++) {
            divElement = document.createElement("div");
            liElement = document.createElement("li");
            imageDOM = document.createElement("img");

            currentCat = cats[i];

            imageDOM.addEventListener('click', (function (cat) {
                var myCat = cat;
                return function () {
                    console.log(myCat);
                    controller.selectCat(myCat);
                }
            })(currentCat));
            //tratamento imagem
            imageDOM.setAttribute("src", currentCat.path);
            imageDOM.classList.add("small-picture");
            //tratamento divElement
            divElement.classList.add("small-picture");
            //appends
            divElement.append(imageDOM);
            liElement.append(divElement);
            globalList.append(liElement);

        }

    }
};

//parte do gato selecionado

var selectedCatView = {
    render: function () {
        var object = controller.getSelectedCat();
        var title = document.getElementById("catName");
        var counter = document.getElementById("timesClicked");
        var image = document.getElementById("imgCat");
        image.setAttribute("src", object.path);
        title.innerText = object.name;
        counter.innerText = object.clicks;
    },
    init: function () {
        var image = document.getElementById("imgCat");
        image.addEventListener("click", controller.catClick);
    }
}

controller.init();
formController.init();
