import sport_01 from './sportbike/sport_01.jpg'
import sport_02 from './sportbike/sport_02.jpg'
import naked_01 from './nakedbike/naked_01.jpg'
import naked_05 from './nakedbike/naked_05.jpg'
import adv_01 from './adventure/adv_01.jpg'
import adv_02 from './adventure/adv_02.jpg'


let popular_data_product = [
    {
        id: 1,
        name: "Yamaha YZF R6",
        capacity: "599cc",
        odo: 5600,
        color: "Yamaha Icon Blue",
        model: "2019",
        brand: "Yamaha",
        option: "full stock",
        description: "alo",
        category: "Sport Bike",
        image: [
          sport_01,
        ],
        price: 16990.0,
      },
      {
        id: 2,
        name: "Ducati Panigale V4S",
        capacity: "1103cc",
        odo: 2300,
        color: "Ducati Red",
        model: "2021",
        brand: "Ducati",
        option: "stock",
        description: "alo",
        category: "Sport Bike",
        image: [
          sport_02,
        ],
        price: 22590.0,
      },
      {
        id: 3,
        name: "Yamaha MT-10",
        capacity: "998cc",
        odo: 4000,
        color: "Tech Black",
        model: "2022",
        brand: "Yamaha",
        option: "stock",
        description: "alo",
        category: "Naked Bike",
        image: [
          naked_01,
        ],
        price: 14800.0,
      },
      {
        id: 4,
        name: "Ducati StreetFighter V4S",
        capacity: "1103cc",
        odo: 7000,
        color: "Dark Stealth",
        model: "2021",
        brand: "Ducati",
        option: "stock",
        description: "alo",
        category: "Naked Bike",
        image: [
          naked_05,
        ],
        price: 20300.0,
      },
      {
        id: 5,
        name: "KTM 1290 Super Adventure R",
        capacity: "1301cc",
        odo: 16000,
        color: "White, Orange",
        model: "2020",
        brand: "KTM",
        option: "stock",
        description: "alo",
        category: "adventure",
        image: [
          adv_01,
        ],
        price: 17900.0,
      },
      {
        id: 6,
        name: "BMW R1250 GS Adventure",
        capacity: "1254cc",
        odo: 14000,
        color: "White, Blue, Red, Black",
        model: "2022",
        brand: "BMW",
        option: "stock",
        description: "alo",
        category: "adventure",
        image: [
          adv_02,
        ],
        price: 19900.0,
      },
]
export default popular_data_product