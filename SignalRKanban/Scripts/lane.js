function Lane (id) {
    var self = this;

    self.cards = ko.observableArray([]);
    self.id = ko.observable(id);

    self.cardDraggedOver = function (lane, event) {
         event.preventDefault();
    };
}