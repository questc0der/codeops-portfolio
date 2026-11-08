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


saving_account = AccountFactory.create("savings", "Tsion", "10005060", 2000)

saving_account.subscribe(SMSAlert())
saving_account.subscribe(AuditLog())
saving_account.deposit(2000)
saving_account.withdraw(500)

saving_account.statement()
