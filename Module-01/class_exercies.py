total_spent = {}
try:
    with open('transaction.txt', 'r') as f:
        for line in f:
            key, value = line.strip().split(",")
            total_spent[key] = int(value)
    with open('report.txt', 'w') as report:
        for name, total in sorted(total_spent.items(), key=lambda x: x[1], reverse = True):
            report.write(f"{name, total}\n")          
except FileNotFoundError:
    print("No such file")

