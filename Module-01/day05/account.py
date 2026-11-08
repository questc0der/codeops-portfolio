class Account:
    def __init__(self, owner, account_number, balance = 0):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
    
    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Please enter positive integer")
        self.__balance += amount
    def withdraw(self, amount):
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount
    def statement(self):
        print(f"Name: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.__balance} ETB")

class SavingAccount(Account):
    def __init__(self,owner, account_number, balance = 0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate
    def add_interest(self):
        self.deposit(self.balance * self.rate)
    def statement(self):
        print(f"Account Type: Saving Account\nName: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.balance} ETB")

class CurrentAccount(Account):
    def __init__(self,owner, account_number, balance=0, overdraft=1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self):
        pass
    def statement(self):
        print(f"Account Type: Current Account\nName: {self.owner}\nAcc_no: {self.account_number}\nAmount: {self.balance} ETB")

accounts = [SavingAccount('Tsion', "10005060", 2000), CurrentAccount('Abebe', "10000000", 3000)]

for account in accounts:
    account.statement()

# Tsion = Account('Tsion', "10005060", 2000)
# Tsion.statement()