using System;

namespace SignalRKanban.Models
{
    public class Card
    {
        public Guid ID { get; set; }

        public string Content { get; set; }

        public string Lane { get; set; }

        public string Board { get; set; }
    }
}
