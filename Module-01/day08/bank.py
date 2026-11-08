class Account:
    def __init__(self, owner, account_number, balance = 0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
        self._observers = []
    
    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Please enter positive integer")

        self.__balance += amount
        self._notify(f"{amount} ETB deposited.")

    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
        self._notify(f"{amount} ETB withdrawn")

    def statement(self):
        print(f"Name: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.__balance} ETB")

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, event):
        for observer in self._observers:
            observer.update(event)

class BankConfig:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance

class SMSAlert:
    def update(self, event):
        print(f"[SMS] {event}")
    
class AuditLog:
    def update(self, event):
        print(f"[Log] {event}")

class SavingAccount(Account):
    def __init__(self,owner, account_number, balance = 0, rate=None):
        super().__init__(owner, account_number, balance)
        if rate is None:
            self.rate = BankConfig().interest_rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        print(f"Account Type: Saving Account\nName: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.balance} ETB")

class CurrentAccount(Account):
    def __init__(self,owner, account_number, balance=0, overdraft=None):
        super().__init__(owner, account_number, balance)
        if overdraft is None:
            self.overdraft = BankConfig().overdraft_limit

    def withdraw(self):
        pass
    def statement(self):
        print(f"Account Type: Current Account\nName: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.balance} ETB")
 
class AccountFactory:
    @staticmethod
    def create(kind, owner, account_number, balance):
        if kind == "savings":
            return SavingAccount(owner, account_number, balance)
        elif kind == "current":
            return CurrentAccount(owner, account_number, balance)
        else:
            raise ValueError("Please choose Saving account or Current account")


# --- Added Helper: Custom History Tracker Observer ---
class HistoryTracker:
    """Observer attached to accounts upon registry addition to log transactions."""
    def __init__(self):
        self.history = []

    def update(self, event):
        self.history.append(event)


# --- Added Standalone Binary Search Function ---
def binary_search(arr, target):
    """Custom binary search algorithm. Returns index if target is found, else -1."""
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1


class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []
        self.trackers = {} # Maps account_number -> HistoryTracker observer

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
        
        # Attach observer to record history without modifying Account class
        tracker = HistoryTracker()
        acc.subscribe(tracker)
        self.trackers[acc.account_number] = tracker

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        result = []
        for number in self.order:
            account_obj = self.by_number[number]
            result.append(account_obj)
        return result

    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number.keys())
        i = binary_search(nums, number)
        if i >= 0:
            key = nums[i]
            return self.by_number[key]
        return None

    def total_transactions(self, number):
        tracker = self.trackers.get(number)
        if tracker is None:
            return 0

        def _count_recursive(history, index):
            if index == len(history): # Base case
                return 0
            return 1 + _count_recursive(history, index + 1) # Recursive step

        return _count_recursive(tracker.history, 0)



saving_account = AccountFactory.create("savings", "Tsion", "10005060", 2000)

saving_account.subscribe(SMSAlert())
saving_account.subscribe(AuditLog())

registry = AccountRegistry()
registry.add(saving_account)

saving_account.deposit(2000)
saving_account.withdraw(500)

saving_account.statement()

found_acc = registry.find_by_number("10005060")
print(f"Binary Search Found: {found_acc.owner if found_acc else 'Not Found'}")

tx_count = registry.total_transactions("10005060")
print(f"Total Recursive Transactions Count: {tx_count}")

top = registry.top_by_balance(1)
print(f"Top Account Balance: {top[0].balance} ETB")