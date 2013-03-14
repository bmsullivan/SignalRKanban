function KanbanBoard () {
    var self = this;

    self.boardName = ko.observable("");
    self.oldBoardName = ko.observable("");

    self.lanes = ko.observableArray([new Lane("1"), new Lane("2"), new Lane("3"), new Lane("4")]);

    self.setCardContentById = function (id, content) {
        for (var i in self.lanes()) {
            for (var j in self.lanes()[i].cards()) {
                if (self.lanes()[i].cards()[j].id() === id) {
                    self.lanes()[i].cards()[j].content(content);
                }
            }
        }
    };
    
    self.moveCardToLane = function (id, lane) {
        var movedCard;
        for (var i in self.lanes()) {
            for (var j in self.lanes()[i].cards()) {
                if (self.lanes()[i].cards()[j].id() === id) {
                    movedCard = self.lanes()[i].cards.splice(j, 1)[0];
                }
            }
        }

        self.addNewCardToLane(movedCard.id(), movedCard.content(), lane);
    };

    self.addNewCardToLane = function (id, content, lane) {
        for (var k in self.lanes()) {
            if (self.lanes()[k].id() === lane) {
                self.lanes()[k].cards.push(new Card(id, content));
            }
        }
    };
}
