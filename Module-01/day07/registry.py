class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []
    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
    def find(self, number):
        return self.by_number.get(number)
    def list_all(self):
        result = []
        for number in self.order:
            account_obj = self.by_number[number]
            result.append(account_obj)
        return result

