import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    id : Text;
    sender : Text;
    content : Text;
    conversation : Text;
    timestamp : Int;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Text.compare(message1.id, message2.id);
    };
  };

  let messages = Map.empty<Text, Message>();

  // Save new messages (add/overwrite)
  public shared ({ caller }) func saveMessages(newMessages : [Message]) : async () {
    newMessages.forEach(func(msg) { messages.add(msg.id, msg) });
  };

  // Get all messages
  public query ({ caller }) func getMessages() : async [Message] {
    if (messages.isEmpty()) {
      seedDemoMessagesInternal();
    };
    messages.values().toArray().sort();
  };

  // Delete message by id
  public shared ({ caller }) func deleteMessage(id : Text) : async () {
    if (not messages.containsKey(id)) { Runtime.trap("Message does not exist!") };
    messages.remove(id);
  };

  // Clear all messages
  public shared ({ caller }) func clearAllMessages() : async () {
    messages.clear();
  };

  // Seed demo messages
  public shared ({ caller }) func seedDemoMessages() : async () {
    seedDemoMessagesInternal();
  };

  // Internal function to always seed messages
  func seedDemoMessagesInternal() {
    let demoMessages : [Message] = [
      {
        id = "1";
        sender = "Alice";
        content = "Hey, what's up?";
        conversation = "Friends";
        timestamp = 1719498223;
      },
      {
        id = "2";
        sender = "Bob";
        content = "Meeting at 3pm?";
        conversation = "Work";
        timestamp = 1719501823;
      },
      {
        id = "3";
        sender = "Charlie";
        content = "Happy Birthday!";
        conversation = "Family";
        timestamp = 1719505423;
      },
    ];
    messages.clear();
    demoMessages.forEach(func(msg) { messages.add(msg.id, msg) });
  };
};
