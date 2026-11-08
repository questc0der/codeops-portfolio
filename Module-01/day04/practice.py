class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    def describe():
        print("One line summary")

class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity
    @property
    def quantity(self):
        return self.__quantity
    @quantity.setter
    def quantity(self, amount):
        if amount < 0:
            raise ValueError("Please enter positive number")
        self.__quantity = amount
    def restock(self, n):
        self.quantity += n
    def sell(self, n):
        self.quantity -= n

product_one = Product('iPhone', '20000', 15)
product_two = Product('SAMSUNG', '10000', 20)
product_three = Product('TECNO', '5000', 30)

product_one.restock(20)
product_one_quantity = product_one.quantity
product_two_quantity = product_two.quantity
product_three_quantity = product_three.quantity
print(product_one_quantity)
print(product_two_quantity)
print(product_three_quantity)