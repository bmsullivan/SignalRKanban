$(function () {
    
    var kanbanHub = $.connection.kanbanHub;

    KanbanBoard.prototype.createCard = function () {
        kanbanHub.server.createCard(this.boardName());
    };
    
    Card.prototype.isEditingChanged = function (newVal, card) {
        if (!newVal) {
            kanbanHub.server.changeCardContent(card.id(), card.content());
        }
    };
    
    var draggedCard;

    KanbanBoard.prototype.dragCard = function (card, event) {
        draggedCard = card;
        return true;
    };
    
    KanbanBoard.prototype.dropCardOnLane = function (lane, event) {
        kanbanHub.server.moveCard(draggedCard.id(), lane.id());
    };
    
     KanbanBoard.prototype.joinBoard = function () {
        kanbanHub.server.joinBoard(this.boardName(), this.oldBoardName());
    };
   
    var vm = new KanbanBoard();
    
    kanbanHub.client.cardCreated = function (card) {
        vm.addNewCardToLane(card.ID, card.Content, card.Lane);
    };
    
    kanbanHub.client.cardContentChanged = function (card) {
        vm.setCardContentById(card.ID, card.Content);
    };
    
    kanbanHub.client.cardMoved = function (id, lane) {
        vm.moveCardToLane(id, lane);
    };
    
    kanbanHub.client.clearAllCards = function () {
        vm.lanes([new Lane("1"), new Lane("2"), new Lane("3"), new Lane("4")]);
    };
  
    $.connection.hub.start();
    
    ko.applyBindings(vm);

});

