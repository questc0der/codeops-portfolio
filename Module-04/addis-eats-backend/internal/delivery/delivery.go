package delivery

import "errors"

var ErrUnservedArea = errors.New("unserved delivery area")

var deliveryFees = map[string]int{
    "Addis Ababa": 5000,
    "Bole":        3000,
    "Piassa":      4000,
    "Merkato":     3500,
}

func FeeSantim(area string)(int, error){
	fee, ok := deliveryFess[area]

	if !ok{
		return 0, ErrUnservedArea
	}
	return fee, nil
}