#Temperature label
temperature = int(input("Input temperature in C: "))
if(temperature < 15):
    print("Cold")
elif(temperature >= 15 and temperature <= 28):
    print("Warm")
else:
    print("Hot")

#Receipt loop
for i in range(1, 11):
    print(f"Receipt #{i}")

#Even number
for i in range(1, 21):
    if(i % 2 == 0):
        print(f"{i} is even number")

#Discount function
def apply_discount(price, percent = 10):
    return price - (price * percent/100)

print(apply_discount(100))

#Countdown
initial = 5
while initial != 0:
    print(initial)
    print("Liftoff!!")
    initial -= 1