$(function () {
    
    var kanbanHub = $.connection.kanbanHub;

    KanbanBoard.prototype.createCard = function() {
        kanbanHub.server.createCard();
    };
    
    Card.prototype.isEditingChanged = function (newVal, card) {
        if (!newVal) {
            kanbanHub.server.changeCardContent(card.id(), card.content());
        }
    };
    
    var vm = new KanbanBoard();
    
    kanbanHub.client.cardCreated = function (card) {
        vm.addNewCardToLane(card.ID, card.Content, card.Lane);
    };
    
    kanbanHub.client.cardContentChanged = function (card) {
        vm.setCardContentById(card.ID, card.Content);
    };
    
    $.connection.hub.start();
    
    ko.applyBindings(vm);

});

