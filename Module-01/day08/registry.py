class AccountRegistry:
    def __init__(self):
        self.by_number = {}
        self.order = []
        self.trackers = {} # Maps account_number -> HistoryTracker observer

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
        
        # Attach observer to record history without modifying Account class
        tracker = HistoryTracker()
        acc.subscribe(tracker)
        self.trackers[acc.account_number] = tracker

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        result = []
        for number in self.order:
            account_obj = self.by_number[number]
            result.append(account_obj)
        return result

    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number.keys())
        i = binary_search(nums, number)
        if i >= 0:
            key = nums[i]
            return self.by_number[key]
        return None

    def total_transactions(self, number):
        tracker = self.trackers.get(number)
        if tracker is None:
            return 0

        def _count_recursive(history, index):
            if index == len(history): # Base case
                return 0
            return 1 + _count_recursive(history, index + 1) # Recursive step

        return _count_recursive(tracker.history, 0