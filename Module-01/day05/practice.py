from abc import ABC, abstractmethod
class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def describe(self):
        return f"Make: {self.make}, Model: {self.model}"
    
    @abstractmethod
    def wheels(self): ...

class Car(Vehicle):
    def wheels(self):
        return 4

class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity
    
    def describe(self):
        return f"{super().describe()}, Capacity: {self.capacity}"

    def wheels(self):
        return 9

vehicles = [Truck('Volvo', 'VV-33', 20),Car('Toyota', 'Corolla'), Truck('ISUZU', 'IS-33', 10), Car('Volkswagen', 'VW-115')]

for vehicle in vehicles:
    print(vehicle.describe())