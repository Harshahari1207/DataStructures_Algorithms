const list = LinkedList();
  list.append(5);
  list.append(6);
  list.append(7)
  list.prepend(10);
  list.prepend(9);
  list.prepend(8);
  list.insertAt(3, 1);
  list.pop();
  list.removeAt(4);
  
  console.log(list.size);
  console.log(list.head);
  console.log(list.at(1));
  console.log(list.find(10));
  console.log(list.tail());
  console.log(list.toString());