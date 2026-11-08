package order

const SantimPerBirr = 100
const ServiceRatePct float64 = 5

type Status int

const (
	Placed Status = iota
	Accepted
	Cooking
	OnTheWay
	Delivered
)