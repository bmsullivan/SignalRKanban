namespace SignalRKanban.Hubs
{
    using System;
    using System.Collections.Concurrent;
    using System.Linq;

    using Microsoft.AspNet.SignalR;

    using SignalRKanban.Models;

    public class KanbanHub : Hub
    {
        private static ConcurrentDictionary<Guid, Card> _cards = new ConcurrentDictionary<Guid, Card>();

        public void CreateCard(string board)
        {
            var id = Guid.NewGuid();
            var card = new Card { ID = id, Lane = "1", Content = "", Board = board};
            _cards[id] = card;
            Clients.Group(board).cardCreated(card);                        
        }

        public void ChangeCardContent(Guid id, string content)
        {
            var card = _cards[id];
            card.Content = content;
            Clients.Group(card.Board).cardContentChanged(card);
        }

        public void MoveCard(Guid id, string lane)
        {
            var card = _cards[id];
            card.Lane = lane;
            Clients.Group(card.Board).cardMoved(id, lane);
        }
        
        public void JoinBoard(string name, string oldBoardName)
        {
            Groups.Remove(Context.ConnectionId, oldBoardName);
            Groups.Add(Context.ConnectionId, name);
            Clients.Caller.clearAllCards();
            var boardCards = _cards.Where(c => c.Value.Board == name).Select(c => c.Value).ToList();
            foreach (var boardCard in boardCards)
            {
                Clients.Caller.cardCreated(boardCard);
            }
        }

    }
}