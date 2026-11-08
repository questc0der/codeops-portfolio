import random

def total(nums):
    if len(nums) == 0:
        return 0
    return nums[0] + total(nums[1:])

def count_down(n):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)

# my_nums = [10, 20, 30, 40]
# print("Total sum:", total(my_nums))

# print("Count down:")
# count_down(5)
# print()


def binary_search(items, target):
    low = 0
    high = len(items) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1

balances = [100.50, 250.00, 500.00, 1200.75, 3000.00]
target_balance = 1200.75

index = binary_search(balances, target_balance)
print(f"Balances: {balances}")
print(f"Index of {target_balance}: {index}")
print(f"Index of 9999.00: {binary_search(balances, 9999.00)}")
print()


def merge(left, right):
    result = []
    i = 0
    j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    while i < len(left):
        result.append(left[i])
        i += 1
        
    while j < len(right):
        result.append(right[j])
        j += 1
        
    return result

def merge_sort(items):
    if len(items) <= 1:
        return items
        
    mid = len(items) // 2
    left_half = items[:mid]
    right_half = items[mid:]
    
    sorted_left = merge_sort(left_half)
    sorted_right = merge_sort(right_half)
    
    return merge(sorted_left, sorted_right)

random_list = [42, 12, 88, 3, 25, 60]
my_sorted = merge_sort(random_list)
python_sorted = sorted(random_list)

print("Original:", random_list)
print("Merge sort result:", my_sorted)
print("Matches built-in sorted():", my_sorted == python_sorted)
print()


accounts = [
    ("Tsion", 2000),
    ("Abebe", 5000),
    ("Kebede", 1500),
    ("Sara", 3500)
]

sorted_accounts = sorted(accounts, key=lambda item: item[1], reverse=True)

print("Accounts sorted by balance descending:")
for acc in sorted_accounts:
    print(f"Name: {acc[0]}, Balance: {acc[1]}")
print()

def has_pair(nums, target):
    left = 0
    right = len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return False

sorted_nums = [10, 20, 35, 50, 75, 100]

print("List:", sorted_nums)
print("Has pair for 85 (35 + 50)?", has_pair(sorted_nums, 85))
print("Has pair for 200?", has_pair(sorted_nums, 200))