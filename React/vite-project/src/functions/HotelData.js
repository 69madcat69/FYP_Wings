// import Hotel1 from "../components/assets/Hotel1.png";
// import other hotel images as needed

const hotelList = [
  {
    CountryName: "Malaysia",
    Cities: [
      {
        CityName: "Kuala Lumpur",
        Hotels: [
          {
            sys: {
              id: "1",
            },
            fields: {
              Type: "Hotel",
              name: "Hotel A",
              price: 100,
              rating: 4.5,
              amenities: ["Free WiFi", "Breakfast included", "Gym"],
              images: [],
            },
          },
          // Add more hotels in Kuala Lumpur as needed
        ],
      },
      // Add more cities in Malaysia as needed
    ],
  },
  {
    CountryName: "Japan",
    Cities: [
      {
        CityName: "Tokyo",
        Hotels: [
          {
            sys: {
              id: "2",
            },
            fields: {
              Type: "Hotel",
              name: "Hotel B",
              price: 120,
              rating: 4.2,
              amenities: ["Free WiFi", "Pool", "Restaurant"],
              images: [
                // Add images for Hotel B in Tokyo if available
              ],
            },
          },
          // Add more hotels in Tokyo as needed
        ],
      },
      // Add more cities in Japan as needed
    ],
  },
  // Add more countries and cities as needed
  {
    CountryName: "Thailand",
    Cities: [
      {
        CityName: "Bangkok",
        Hotels: [
          {
            sys: {
              id: "3",
            },
            fields: {
              Type: "Hotel",
              name: "Hotel C",
              price: 90,
              rating: 4.0,
              amenities: ["Free WiFi", "Swimming Pool", "Spa"],
              images: [
                // Add images for Hotel C in Bangkok if available
              ],
            },
          },
          // Add more hotels in Bangkok as needed
        ],
      },
      // Add more cities in Thailand as needed
    ],
  },
  {
    CountryName: "South Korea",
    Cities: [
      {
        CityName: "Seoul",
        Hotels: [
          {
            sys: {
              id: "4",
            },
            fields: {
              Type: "Hotel",
              name: "Hotel D",
              price: 110,
              rating: 4.3,
              amenities: ["Free WiFi", "Fitness Center", "Restaurant"],
              images: [
                // Add images for Hotel D in Seoul if available
              ],
            },
          },
          // Add more hotels in Seoul as needed
        ],
      },
      // Add more cities in South Korea as needed
    ],
  },
  {
    CountryName: "Singapore",
    Cities: [
      {
        CityName: "Singapore",
        Hotels: [
          {
            sys: {
              id: "5",
            },
            fields: {
              Type: "Hotel",
              name: "Hotel E",
              price: 150,
              rating: 4.7,
              amenities: ["Free WiFi", "Infinity Pool", "Rooftop Bar"],
              images: [
                // Add images for Hotel E in Singapore if available
              ],
            },
          },
          // Add more hotels in Singapore as needed
        ],
      },
      // Add more cities in Singapore as needed
    ],
  },
  {
    CountryName: "Indonesia",
    Cities: [
      {
        CityName: "Bali",
        Hotels: [
          {
            sys: {
              id: "6",
            },
            fields: {
              Type: "Hotel",
              name: "Hotel F",
              price: 80,
              rating: 4.1,
              amenities: ["Free WiFi", "Beachfront", "Spa"],
              images: [
                // Add images for Hotel F in Bali if available
              ],
            },
          },
          // Add more hotels in Bali as needed
        ],
      },
      // Add more cities in Indonesia as needed
    ],
  },
];

export default hotelList;
