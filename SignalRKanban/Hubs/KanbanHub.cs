namespace SignalRKanban.Hubs
{
    using System;
    using System.Collections.Concurrent;

    using Microsoft.AspNet.SignalR;

    using SignalRKanban.Models;

    public class KanbanHub : Hub
    {
        private static ConcurrentDictionary<Guid, Card> _cards = new ConcurrentDictionary<Guid, Card>();

        public void CreateCard()
        {
            var id = Guid.NewGuid();
            var card = new Card { ID = id, Lane = "1", Content = ""};
            _cards[id] = card;
            Clients.All.cardCreated(card);                        
        }
    }
}