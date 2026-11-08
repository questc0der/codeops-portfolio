class Account:
    def __init__(self, owner, account_number, balance):
        self.owner = owner
        self.account_number = account_number
        self.__balance = balance
    
    @property
    def balance(self):
        return f"{self.owner, self.__balance}"
    
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Please enter positive integer")
        self.__balance += amount
    def withdraw(self, amount):
        if amount > self.__balance:
            return "Insufficient Balance"
        self.__balance -= amount

Abebe = Account('Abebe', '10005060', 1000)
Tsion = Account('Tsion', '10007080', 2000)

Abebe.deposit(1000)
Abebe_balance = Abebe.balance
print(Abebe_balance) 

Tsion.withdraw(1000)
Tsion_balance = Tsion.balance
print(Tsion_balance)