import Fly1 from "../components/assets/BUDGETAIR.png";

export default [
  {
    sys: {
      id: "1",
    },
    fields: {
      Type: "Flight",
      name: "AirAsia",
      price: 104,
      firstdate1: "12:00",
      firstdate2: "01:28",
      enddate1: "01:28",
      enddate2: "05:00",
      timetaken: "2h 28m",
      StartPlace: "EWR",
      FullStartPlace: "Newark Liberty International Airport",
      Transit: "BNA",
      EndPlace: "DMM",
      images: [
        {
          fields: {
            file: {
              url: Fly1,
            },
          },
        },
      ],
    },
  },
  {
    sys: {
      id: "2",
    },
    fields: {
      Type: "Flight",
      name: "Singapore Airlines",
      price: 220,
      firstdate1: "11:30",
      firstdate2: "00:30",
      enddate1: "00:30",
      enddate2: "04:00",
      timetaken: "2h 30m",
      StartPlace: "LAX",
      FullStartPlace: "Los Angeles International Airport",
      Transit: "SIN",
      EndPlace: "HND",
      images: [
        {
          fields: {
            file: {
              url: Fly1,
            },
          },
        },
      ],
    },
  },
  {
    sys: {
      id: "3",
    },
    fields: {
      Type: "Flight",
      name: "All Nippon Airways",
      price: 300,
      firstdate1: "08:00",
      firstdate2: "15:00",
      enddate1: "15:00",
      enddate2: "22:00",
      timetaken: "7h",
      StartPlace: "JFK",
      FullStartPlace: "John F. Kennedy International Airport",
      Transit: "HND",
      EndPlace: "ICN",
      images: [
        {
          fields: {
            file: {
              url: Fly1,
            },
          },
        },
      ],
    },
  },
  {
    sys: {
      id: "4",
    },
    fields: {
      Type: "Flight",
      name: "Cathay Pacific",
      price: 280,
      firstdate1: "09:45",
      firstdate2: "14:00",
      enddate1: "14:00",
      enddate2: "18:15",
      timetaken: "5h 30m",
      StartPlace: "LHR",
      FullStartPlace: "London Heathrow Airport",
      Transit: "HKG",
      EndPlace: "NRT",
      images: [
        {
          fields: {
            file: {
              url: Fly1,
            },
          },
        },
      ],
    },
  },
  {
    sys: {
      id: "5",
    },
    fields: {
      Type: "Flight",
      name: "AirAsia",
      price: 320,
      firstdate1: "10:20",
      firstdate2: "15:30",
      enddate1: "15:30",
      enddate2: "20:40",
      timetaken: "6h 20m",
      StartPlace: "DOH",
      FullStartPlace: "Hamad International Airport",
      Transit: "KUL",
      EndPlace: "SIN",
      images: [
        {
          fields: {
            file: {
              url: Fly1,
            },
          },
        },
      ],
    },
  },
];
