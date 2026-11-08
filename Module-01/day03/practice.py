#Unique cities
# cities = ["Addis Ababa", "Adama","Bahir Dar","Mekelle","Hawassa","Addis Ababa","Jimma","Bahir Dar","Dire Dawa","Hawassa"]
# unique = {city for city in cities}
# count = {city: cities.count(city) for city in unique}
# print(count)
# print(unique)

#Price Report
# groceries = {"banana": 25, "Avocado": 30, "Tomato": 45, "Orange": 30, "apple": 150}
# for grocery in groceries:
#     print(f"{grocery}: {groceries[grocery]}")

#Tax comperhension
prices = [100, 250, 400, 80]
tax = [p * 1.15 for p in prices]
# print(tax)

cheap = [cheap_item for cheap_item in prices if cheap_item < 200]
# print(cheap)

#Write and Read

# customer_names = ["Abebe", "Kebede", "Almaz"]
# with open("names.txt", "w") as f:
#     for customer in customer_names:
#         f.write(f"{customer}\n")
# with open("names.txt", "r") as names:
#     for line in names:
#         print(line);

#Safe Division
try:
    input_number = int(input("Input a number to divide "))
    print(1000/input_number)
except ValueError:
    print("Enter valid integer")
except ZeroDivisionError:
    print("Can't divide when 0 is numerator")
else:
    print("Finished Dividing")
finally:
    print("!!Done!!")