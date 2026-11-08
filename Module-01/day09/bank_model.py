import collections

class Account:
    def __init__(self, account_number, balance):
        self.account_number = account_number
        self.balance = balance

class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, child_branch):
        self.children.append(child_branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        total = 0
        for acc in self.accounts:
            total += acc.balance

        for child in self.children:
            total += child.total_balance()

        return total

def bfs(transfers, start):
    visited = set()
    queue = collections.deque([start])
    visited.add(start)

    while len(queue) > 0:
        current_acc = queue.popleft()

        if current_acc in transfers:
            for recipient in transfers[current_acc]:
                if recipient not in visited:
                    visited.add(recipient)
                    queue.append(recipient)

    return visited

if __name__ == "__main__":
    head_office = Branch("Head Office - Addis Ababa")

    north_region = Branch("Northern Region")
    south_region = Branch("Southern Region")
    head_office.add_child(north_region)
    head_office.add_child(south_region)

    mekelle_branch = Branch("Mekelle Branch")
    bahir_dar_branch = Branch("Bahir Dar Branch")
    north_region.add_child(mekelle_branch)
    north_region.add_child(bahir_dar_branch)

    hawassa_branch = Branch("Hawassa Branch")
    south_region.add_child(hawassa_branch)

    head_office.add_account(Account("ACC-HQ1", 1000000.00))
    
    mekelle_branch.add_account(Account("ACC-M1", 25000.00))
    mekelle_branch.add_account(Account("ACC-M2", 15000.00))

    bahir_dar_branch.add_account(Account("ACC-B1", 30000.00))

    hawassa_branch.add_account(Account("ACC-H1", 50000.00))

    print(f"Mekelle Branch Total: ${mekelle_branch.total_balance():,.2f}")
    print(f"Northern Region Total: ${north_region.total_balance():,.2f}")
    print(f"Entire Bank Grand Total: ${head_office.total_balance():,.2f}")
    print()

    transfers = {
        "ACC-101": ["ACC-102", "ACC-103"],
        "ACC-102": ["ACC-104"],
        "ACC-103": ["ACC-105"],
        "ACC-104": ["ACC-106"],
        "ACC-105": ["ACC-106"],
        "ACC-106": []
    }

    start_acc = "ACC-101"
    reachable = bfs(transfers, start_acc)

    print(f"Start Account: {start_acc}")
    print(f"All Reachable Accounts ({len(reachable)} total): {reachable}")