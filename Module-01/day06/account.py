# class Account:
#     def __init__(self, owner, account_number, balance = 0):
#         self.owner = owner
#         self.account_number = account_number
#         self.__balance = balance
#         self._observers = []
    
#     @property
#     def balance(self):
#         return self.__balance
    
#     def deposit(self, amount):
#         if amount <= 0:
#             raise ValueError("Please enter positive integer")

#         self.__balance += amount
#         self._notify(f"{amount} ETB deposited.")

#     def withdraw(self, amount):
#         if amount > self.__balance:
#             raise ValueError("Insufficient balance")
#         self.__balance -= amount
#         self._notify(f"{amount} ETB withdrawn")

#     def statement(self):
#         print(f"Name: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.__balance} ETB")

#     def subscribe(self, observer):
#         self._observers.append(observer)

#     def _notify(self, event):
#         for observer in self._observers:
#             observer.update(event)

# class SMSAlert:
#     def update(self, event):
#         print(f"[SMS] {event}")
    
# class AuditLog:
#     def update(self, event):
#         print(f"[Log] {event}")

# class SavingAccount(Account):
#     def __init__(self,owner, account_number, balance = 0, rate=0.05):
#         super().__init__(owner, account_number, balance)
#         self.rate = rate
#     def add_interest(self):
#         self.deposit(self.balance * self.rate)
#     def statement(self):
#         print(f"Account Type: Saving Account\nName: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.balance} ETB")

# class CurrentAccount(Account):
#     def __init__(self,owner, account_number, balance=0, overdraft=1000):
#         super().__init__(owner, account_number, balance)
#         self.overdraft = overdraft

#     def withdraw(self):
#         pass
#     def statement(self):
#         print(f"Account Type: Current Account\nName: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.balance} ETB")

# class AccountFactory:
#     @staticmethod
#     def create(kind, owner, account_number, balance):
#         if kind == "savings":
#             AccountRegister().add_account({"kind": kind,"owner": owner,"account_number": account_number,"balance": balance})
#             return SavingAccount(owner, account_number, balance)
#         elif kind == "current":
#             AccountRegister().add_account((kind,owner,account_number,balance))
#             return CurrentAccount(owner, account_number, balance)
#         else:
#             raise ValueError("Please choose Saving account or Current account")

# class AccountRegister:
#     list_of_accounts = []
#     def add_account(self, account):
#         self.list_of_accounts.append(account)
#     def search_account(self, account_name):
#         for list_of_account in self.list_of_accounts:
#             if (account_name == list_of_account["owner"]):
#                 return f"Account Found: {list_of_account}"

# # accounts = [SavingAccount('Tsion', "10005060", 2000), CurrentAccount('Abebe', "10000000", 3000)]

# saving_account = AccountFactory.create("savings", "Tsion", "10005060", 2000)
# saving_account1 = AccountFactory.create("savings", "Kebede", "10005060", 2000)

# saving_account.subscribe(SMSAlert())
# saving_account.subscribe(AuditLog())
# saving_account.deposit(2000)
# saving_account.withdraw(500)

# print(AccountRegister().search_account(("Tsion")))

# print(AccountRegister().list_of_accounts)

# saving_account.statement()

# for account in accounts:
#     account.statement()

# Tsion = Account('Tsion', "10005060", 2000)
# Tsion.statement()
values = [1,2,3,4,5,6,7]
# 1,2,3,4,5,6,7
target = 3

def binary_search(values, target):
    low = values[0]
    high = len(values) - 1
    counter = 0

    while low <= high:
        counter += 1
        print(counter)
        middle = (low + high) // 2
        if values[middle] == target:
            return values[middle]
        elif values[middle] < target:
            low = middle + 1
        else:
            high = middle - 1
    return

print(binary_search(values, target))
