# list index .... O(1) because item is accessed with index and the index let's us know the position directly
# single loop ... O(n) because it has to iterate each value of the list
#nested loop... O(n^2) because one loop runs n times, and inside it another loop runs n times.
#dict lookup ... O(1) because items are accessed with the key value it will directly access that key's value
#binary search ... O(log n) binary search be dividing the list in two then drops the other one it will be log n (shortly it halfs the list)

class Stack:
    def __init__(self, arr):
        self.stack = arr
    
    def push(self, value):
        self.stack.append(value)
    
    def pop(self):
        self.stack.pop(len(self.stack) - 1)
    
    def peek(self):
        return self.stack[-1]

    def list_stack(self):
        for value in self.stack:
            print(value)
names = ["almaz", "kebede", "abebe"]
stack = Stack(names)

# stack.push(1)
# stack.push(2)
# stack.push(3)
# print(stack.peek())


# stack.list_stack()

# class Queue():
#     def __init__(self):
#         self.queue =[]
    
#     def enqueue(self, value):
#         self.queue.append(value)
    
#     def dequeue(self):
#         self.queue.remove(self.queue[0])
    
#     def list_queue(self):
#         for value in self.queue:
#             print(value)

# queue = Queue()
# queue.enqueue(1)
# queue.enqueue(2)
# queue.enqueue(3)
# queue.dequeue()
# queue.dequeue()

# queue.list_queue()

# from collections import deque


# customers_queue = deque(["Abe", "Ku", "Zion", "KB", "Sarah"])

# for customer in list(customers_queue):
#     print(f"Served Customer: {customer}")
#     customers_queue.popleft()
#     print(f"Remaining Customers: {customers_queue}")
# print(customers_queue)

# class Node:
#     def __init__(self, value):
#         self.value = value
#         self.next = None

# class LinkedList:
#     def __init__(self):
#         self.head = None
    
#     def push_front(self, value):
#         new_node = Node(value)
#         new_node.next = self.head
#         self.head = new_node
    
#     def insert(self, value):
#         new_node = Node(value)
        
#         if self.head is None:
#             self.head = new_node
#             return
            
#         current = self.head
#         while current.next is not None:
#             current = current.next
            
#         current.next = new_node
    
#     def print_all(self):
#         current = self.head
#         while current is not None:
#             print(current.value)
#             current = current.next


# ll = LinkedList()
# ll.insert(10)
# ll.insert(20)
# ll.insert(30)

# ll.print_all()

# import time

# # Create 100,000 fake account numbers
# accounts_list = [f"ACC{i:06}" for i in range(10000000000000000000)]
# accounts_dict = {f"ACC{i:06}": f"User {i}" for i in range(10000000000000000000)}

# # Account to search (near the end)
# target = "ACC0999999999999"

# # -----------------------
# # List lookup
# # -----------------------
# start = time.perf_counter()

# found = target in accounts_list

# end = time.perf_counter()

# print("List found:", found)
# print("List lookup time:", end - start)

# # -----------------------
# # Dictionary lookup
# # -----------------------
# start = time.perf_counter()

# found = target in accounts_dict

# end = time.perf_counter()

# print("Dict found:", found)
# print("Dict lookup time:", end - start)

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self, value):
        self.head = Node(value)
    
    def insert(self, value):
        new_node = Node(value)
        if self.head is None:
            self.head = new_node
            return

        current = self.head
        while current.next is not None:
            current = current.next
        
        current.next = new_node
    
    def delete_front(self):
        if self.head is None:
            return -1
        current = self.head
        current = current.next
        self.head = current
    
    def delete_last(self):
        if self.head is None:
            return -1
        current = self.head
        while current.next.next is not None:
            current = current.next
        current.next = None
    
    def print_list(self):
        current = self.head
        while current is not None:
            print(current.value)
            current = current.next

linked_list = LinkedList(2)
linked_list.insert(3)
linked_list.insert(3)
linked_list.insert(3)
# linked_list.delete_front()
# linked_list.delete_front()
linked_list.delete_last()
linked_list.delete_last()

linked_list.print_list()