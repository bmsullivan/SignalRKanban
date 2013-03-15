$(function () {
    
    var kanbanHub = $.connection.kanbanHub;

    KanbanBoard.prototype.createCard = function() {
        kanbanHub.server.createCard();
    };
    
    var vm = new KanbanBoard();
    
    kanbanHub.client.cardCreated = function (card) {
        vm.addNewCardToLane(card.ID, card.Content, card.Lane);
    };

    $.connection.hub.start();
    ko.applyBindings(vm);

});

