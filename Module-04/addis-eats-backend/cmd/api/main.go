// package main

// import "fmt"

// func main(){

// 	dishes := map[string]int{"DoroWat": 18500, "Shiro": 12000, "Tibs": 24000, "Injera": 4500}
	
// 	for k, v := range dishes{
// 		fmt.Printf("%v %.2f\n",k, float64(v)/100)
// 	}

// 	orders := []string{"DoroWat"}
// 	order_fee := 0
// 	for _, v := range orders{
// 		order_fee += dishes[v]
// 	}
// 	final_order := float64(order_fee/100) * 1.05
// 	fmt.Println(final_order)

// 	area := "Megenanga"
// 	delivery_price := 0

// 	if order_fee > 50000{
// 		delivery_price = 0
// 	}else {
// 	switch area{
// 	case "Bole":
// 		delivery_price = order_fee + 3000
// 	case "Kazanchis":
// 		delivery_price = order_fee + 3500
// 	case "Piassa":
// 		delivery_price = order_fee + 4000
// 	case "Megenagna":
// 		delivery_price = order_fee + 4500
// 	default:
// 		delivery_price = order_fee + 5000
// 	}
// }
// 	grand_total := float64(delivery_price/100) + final_order

// 	fmt.Printf("%.2f\n", grand_total)

// }
package main

import (
    "errors"
    "fmt"

    "example.com/m/internal/menu"
    "example.com/m/internal/order"
	"example.com/m/internal/delivery"
)

func main() {
    dishes := menu.Menu()

    validOrder := order.Order{
        Area: "Bole",
    }

    validOrder.AddItem(dishes[0])
    validOrder.AddItem(dishes[3])

    emptyOrder := order.Order{
        Area: "Bole",
    }

    invalidAreaOrder := order.Order{
        Area: "Ayat",
    }

    invalidAreaOrder.AddItem(dishes[1])

    total, err := validOrder.TotalSantim()

    if err != nil {
        fmt.Println("Valid order failed:", err)
    } else {
        fmt.Printf("Valid order total: %d santim\n", total)
    }

    _, err = emptyOrder.TotalSantim()

    if errors.Is(err, order.ErrEmptyOrder) {
        fmt.Println("Empty order: Cannot process an empty order.")
    }

    _, err = invalidAreaOrder.TotalSantim()

    if errors.Is(err, order.ErrEmptyOrder) {
        fmt.Println("Empty order: Cannot process an empty order.")
    } else if errors.Is(err, delivery.ErrUnservedArea) {
        fmt.Println("Delivery error: Ayat is outside our delivery area.")
    }
}