import collections
import heapq


class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
        
    return root

def in_order(root):
    if root is None:
        return
    
    in_order(root.left)
    print(root.value, end="  ")
    in_order(root.right)

balances = [500, 200, 800, 100, 300, 700]
root = None

for bal in balances:
    root = insert(root, bal)

print("Balances in sorted order (In-Order Traversal):")
in_order(root)
print("\n")


def height(node):
    if node is None:
        return 0
    
    left_height = height(node.left)
    right_height = height(node.right)
    
    if left_height > right_height:
        return 1 + left_height
    else:
        return 1 + right_height

print("Height of BST:", height(root))
print()


def bfs(graph, start):
    visited = set()
    queue = collections.deque([start])
    visited.add(start)
    visit_order = []

    while len(queue) > 0:
        visit_order.append(vertex)

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    print("BFS Visit Order:", visit_order)
    return visited

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

reachable_bfs = bfs(graph, 'A')
print("Reachable vertices:", reachable_bfs)
print()



dfs_visit_order = []

def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    dfs_visit_order.append(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited

reachable_dfs = dfs(graph, 'A')
print("DFS Visit Order:", dfs_visit_order)
print("Reachable vertices:", reachable_dfs)
print()



tasks_pq = []

heapq.heappush(tasks_pq, (3, "Low priority audit"))
heapq.heappush(tasks_pq, (1, "Critical account fraud alert"))
heapq.heappush(tasks_pq, (5, "Monthly statement batch print"))
heapq.heappush(tasks_pq, (2, "VIP customer transaction"))
heapq.heappush(tasks_pq, (4, "Database backup cleanup"))

print("Popping tasks by priority:")
while len(tasks_pq) > 0:
    priority, task = heapq.heappop(tasks_pq)
    print(f"Priority {priority}: {task}")