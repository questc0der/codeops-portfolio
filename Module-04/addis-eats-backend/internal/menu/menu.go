package menu
type Dish struct{
	Name string
	PriceSantim int
	IsFasting bool
}

func Menu() []Dish{
    return []Dish{
        {"Doro Wot", 25000, false},
        {"Tibs", 20000, false},
        {"Kitfo", 30000, false},
        {"Shiro", 10000, true},
        {"Misir Wot", 12000, true},
        {"Gomen", 8000, true},
        {"Firfir", 15000, true},
        {"Beyaynet", 18000, true},
    }
}