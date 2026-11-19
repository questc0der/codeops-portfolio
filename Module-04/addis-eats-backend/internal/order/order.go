package order

import (
    "errors"
    "fmt"

    "example.com/m/internal/delivery"
    "example.com/m/internal/menu"
)

var ErrEmptyOrder = errors.New("order is empty")

const (
    ServiceFeePercent = 5
    FreeDeliveryThreshold = 100000
)

type Order struct {
    Items []menu.Dish
    Area  string
}

func (o *Order) AddItem(d menu.Dish) {
    o.Items = append(o.Items, d)
}

func (o Order) SubtotalSantim() int {
    subtotal := 0

    for _, item := range o.Items {
        subtotal += item.PriceSantim
    }

    return subtotal
}

func (o Order) TotalSantim() (int, error) {
    if len(o.Items) == 0 {
        return 0, ErrEmptyOrder
    }

    subtotal := o.SubtotalSantim()

    serviceFee := subtotal * ServiceFeePercent / 100

    deliveryFee := 0

    if subtotal < FreeDeliveryThreshold {
        fee, err := delivery.FeeSantim(o.Area)

        if err != nil {
            return 0, fmt.Errorf("delivery fee: %w", err)
        }

        deliveryFee = fee
    }

    total := subtotal + serviceFee + deliveryFee

    return total, nil
}