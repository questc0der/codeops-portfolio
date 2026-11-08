customers = [
 ("Almaz", 1500), ("Dawit", 700), ("Tigist", 200),
 ("Hanna", 1200), ("Samuel", 450),
]

def tier(balance):
    if(balance >= 1000):
        return "Premium"
    elif(balance >= 500):
        return "Standard"
    else:
        return "Basic"

tiers = []

for i in range(len(customers)):
    print(f"Name: {customers[i][0]}, Tier: {tier(customers[i][1])}, Balance: {customers[i][1]} ETB")
    tiers.append(tier(customers[i][1]))

print(f"Premium tier: {tiers.count("Premium")}")
print(f"Standard tier: {tiers.count("Standard")}")
print(f"Basic tier: {tiers.count("Basic")}")
