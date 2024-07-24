async function fetchDataFromApi() {
  try {
    const response = await fetch('https://backendauction.mydriven.ae/brandsar');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null; // or handle the error as needed
  }
}

const brands = []

fetchDataFromApi()
  .then(data => {
    if (data) {
      brands.push(data)
      // Do something with the data
    } else {
      console.log('Failed to fetch data from API');
    }
  })
  .catch(error => {
    console.error('Error in fetching data:', error.message);
  });

  export const orphanage_input = [
    {
      id: 1,
      label: "Name*",
      type: "text",
      placeholder: "Enter Name",
      name: 'name'
    },
    {
      id: 2,
      label: "address*",
      type: "text",
      placeholder: "Enter Address",
      name: 'address'
    },
    {
      id: 3,
      label: "City*",
      type: "text",
      placeholder: "Enter City",
      name: 'city'
    },
    {
      id: 4,
      label: "Phone*",
      type: "text",
      placeholder: "Enter Phone",
      name: 'contact'
    },
    {
      id: 5,
      label: "Email*",
      type: "email",
      placeholder: "Enter Email",
      name: 'email'
    },
    {
      id: 6,
      label: "Web*",
      type: "text",
      placeholder: "Enter web",
      name: 'web'
    },
    {
      id: 7,
      label: "Licence No*",
      type: "text",
      placeholder: "Enter licence no",
      name: 'licence_no'
    },
  ]

  export const orphanagebranch_input = [
    {
      id: 2,
      label: "Address*",
      type: "text",
      placeholder: "Enter Address",
      name: 'Address'
    },
    {
      id: 3,
      label: "City*",
      type: "text",
      placeholder: "Enter City",
      name: 'city'
    },
    {
      id: 4,
      label: "Capacity*",
      type: "text",
      placeholder: "Enter Capacity",
      name: 'Capacity'
    },
    {
      id: 5,
      label: "No of rooms*",
      type: "text",
      placeholder: "Enter No of rooms",
      name: 'N_room'
    },
    {
      id: 6,
      label: "No of washrooms*",
      type: "text",
      placeholder: "Enter No of washrooms",
      name: 'No_washrooms'
    },
    {
      id: 7,
      label: "No of showers*",
      type: "text",
      placeholder: "Enter No of showers",
      name: 'No_showers'
    },
    {
      id: 8,
      label: "No of Hall*",
      type: "text",
      placeholder: "Enter No Hall",
      name: 'No_hall'
    },
    {
      id: 9,
      label: "No of Gates*",
      type: "text",
      placeholder: "Enter No Gates",
      name: 'No_gates'
    },
    {
      id: 10,
      label: "Size*",
      type: "text",
      placeholder: "Enter size in sq ft",
      name: 'size'
    },
    {
      id: 11,
      label: "No of stories*",
      type: "text",
      placeholder: "Enter no of stories",
      name: 'no_of_stories'
    },
    {
      id: 12,
      label: "No of Orphans*",
      type: "text",
      placeholder: "Enter No of Orphans",
      name: 'No_orphans'
    },
    {
      id: 13,
      label: "Available space*",
      type: "text",
      placeholder: "Enter available_space",
      name: 'available_space'
    },
    {
      id: 14,
      label: "Update Time*",
      type: "datetime-local",
      placeholder: "Enter Update Time",
      name: 'date_time'
    }
  ]
export const userInputs = [
    {
      id: 1,
      label: "Name*",
      type: "text",
      placeholder: "Enter Name",
      name: 'name'
    },
    {
      id: 3,
      label: "Email*",
      type: "mail",
      placeholder: "Enter Email",
      name: 'email'
    },
    {
      id: 4,
      label: "Phone*",
      type: "text",
      placeholder: "Enter Phone",
      name: 'phone'
    },
    {
      id: 5,
      label: "Country*",
      type: "text",
      placeholder: "Enter Country",
      name: 'country'
    },
    {
      id: 6,
      label: "City*",
      type: "text",
      placeholder: "Enter City",
      name: 'city'
    },
    {
      id: 7,
      label: "State*",
      type: "text",
      placeholder: "Enter State",
      name: 'state'
    },
    {
      id: 8,
      label: "ZIP Code*",
      type: "text",
      placeholder: "Enter ZIP Code",
      name: 'zip_code'
    },
    {
      id: 9,
      label: "Address*",
      type: "text",
      placeholder: "Enter Address",
      name: 'address'
    },
    {
      id: 10,
      label: "Password*",
      name: 'Password',
      placeholder: 'Enter Password',
      type: "Text",
    },
    ,{
      name: "Salary",
      type: "text",
      label: "Salary*",
      placeholder: 'Salary',
      width: 100,
    },{
      label: "Joinning Date*",
      name: "Joinning_date",
      placeholder: 'Enter Joining date',
      width: 100,
      type: "date",
    },{
      label: "Date of Birth*",
      name: "date_of_birth",
      placeholder: 'Enter Date of birth',
      width: 100,
      type: "date",
    },{
      label: "Employ No*",
      name: "Emp_no",
      placeholder: 'Enter Employ No',
      width: 100,
      type: "text",
    }
  ];


  export const GuardianInputs = [
    {
      id: 3,
      label: "Guardian Name*",
      type: "mail",
      placeholder: "Enter Gardian name	",
      name: 'gardian_name'
    },
    {
      id: 4,
      label: "Gardian cnic*",
      type: "text",
      placeholder: "Enter Gardian cnic",
      name: 'gardian_cnic'
    },
    {
      id: 5,
      label: "Address*",
      type: "text",
      placeholder: "Enter Address",
      name: 'address'
    },
    {
      id: 6,
      label: "Contact*",
      type: "text",
      placeholder: "Enter Contact",
      name: 'contact'
    },
    {
      id: 7,
      label: "Email*",
      type: "text",
      placeholder: "Enter Email",
      name: 'email'
    },
    {
      id: 8,
      label: "Emergency contact*",
      type: "text",
      placeholder: "Enter Emergency contact",
      name: 'emergency_contact'
    }
  ];

  export const vehicleInputs = [
    {
      id: 1,
      label: "Model*",
      type: "text",
      placeholder: "Enter Model",
      name: 'Model'
    },
    {
      id: 3,
      label: "Year*",
      type: "text",
      placeholder: "Enter Year",
      name: 'year'
    },
    {
      id: 4,
      label: "Number*",
      type: "text",
      placeholder: "Enter number",
      name: 'number'
    },
    {
      id: 5,
      label: "Engine no*",
      type: "text",
      placeholder: "Enter engin no",
      name: 'engin_no'
    },
    {
      id: 6,
      label: "Chasses No*",
      type: "text",
      placeholder: "Enter Chasses No",
      name: 'chasses_no'
    },
    {
      id: 7,
      label: "Color*",
      type: "text",
      placeholder: "Enter color",
      name: 'color'
    },
    {
      id: 8,
      label: "Type*",
      type: "text",
      placeholder: "Enter Type",
      name: 'type'
    },
    {
      id: 9,
      label: "NO of Passanger*",
      type: "text",
      placeholder: "Enter Passanger",
      name: 'no_passanger'
    },
    {
      id: 10,
      label: "Load weight*",
      name: 'loadweight',
      placeholder: 'Enter Load weight',
      type: "text",
    },
    ,{
      id: 11,
      name: "fuel_capacity",
      type: "text",
      label: "fuel capacity*",
      placeholder: 'fuel capacity',
      width: 100,
    },{
      id: 12,
      label: "Top Speed*",
      type: "text",
      name: "top_speed",
      placeholder: 'Top Speed',
      width: 100,
    },{
      id: 13,
      label: "Location*",
      name: "location",
      placeholder: 'Enter location',
      type: "text",
    },{
      id: 14,
      label: "Fuel Type*",
      name: "fuel_type",
      placeholder: 'Enter fuel type',
      type: "text",
    }
  ];

  export const childInputs = [
    {
      id: 1,
      label: "Name*",
      type: "text",
      placeholder: "Enter Name",
      name: 'Name'
    },
    {
      id: 4,
      label: "DOB*",
      type: "date",
      placeholder: "Enter DOB",
      name: 'DOB'
    },
    {
      id: 5,
      label: "Register time*",
      type: "datetime-local",
      placeholder: "Enter Register time",
      name: 'register_time'
    },
    {
      id: 6,
      label: "Father name*",
      type: "text",
      placeholder: "Enter Father Name",
      name: 'f_name'
    },
    {
      id: 7,
      label: "Mother Name*",
      type: "text",
      placeholder: "Enter Mother name",
      name: 'M_name'
    },
    {
      id: 8,
      label: "Siblings*",
      type: "text",
      placeholder: "Enter Siblings",
      name: 'Siblings'
    },
    {
      id: 9,
      label: "Father cnic*",
      type: "text",
      placeholder: "Enter Father cnic",
      name: 'F_cnic'
    },
    {
      id: 10,
      label: "Mother cnic*",
      type: "text",
      placeholder: "Enter Mother cnic",
      name: 'M_cnic'
    },
    {
      id: 11,
      label: "cnic*",
      type: "text",
      placeholder: "Enter cnic",
      name: 'cnic'
    },
    {
      id: 12,
      label: "mailing_address*",
      name: 'mailing_address',
      placeholder: 'Enter mailing_address',
      type: "text",
    },
    ,{
      name: "emergency_contact",
      type: "text",
      label: "Emergency contact*",
      placeholder: 'Emergency contact',
      width: 100,
    }
  ];
  
  export const productInputs = [
    {
      id: 1,
      label: "Title",
      type: "text",
      placeholder: "Apple Macbook Pro",
    },
    {
      id: 2,
      label: "Description",
      type: "text",
      placeholder: "Description",
    },
    {
      id: 3,
      label: "Category",
      type: "text",
      placeholder: "Computers",
    },
    {
      id: 4,
      label: "Price",
      type: "text",
      placeholder: "100",
    },
    {
      id: 5,
      label: "Stock",
      type: "text",
      placeholder: "in stock",
    },
  ];
  

  export const carInputs = [
    {
      id: 1,
      label: "Price",
      type: "number",
      placeholder: "Price",
      name: "price"
    },
    {
      id: 2,
      label: "Incremental Amount",
      type: "number",
      placeholder: "Incremental Amount",
      name: "previous_price"
    },
    {
      id: 3,
      label: "Speed",
      type: "text",
      placeholder: "Speed",
      name: "speed"
    },
    {
      id: 4,
      label: "Year",
      type: "text",
      placeholder: "Year",
      name: "year"
    },
    {
      id: 5,
      label: "Mileage",
      type: "text",
      placeholder: "Mileage",
      name: "mileage"
    },
    {
      id: 6,
      label: "Featured",
      type: "text",
      placeholder: "Featured",
      name: "featured"
    },
    {
      id: 7,
      label: "Specification",
      type: "text",
      placeholder: "Specification",
      name: 'specification'
    },
    {
      id: 8,
      label: "Status",
      type: "text",
      placeholder: "Status",
      name: "status"
    },
    {
      id: 9,
      label: "Latitude",
      type: "text",
      placeholder: "Latitude",
      name: 'latitude'
    },
    {
      id: 10,
      label: "Longitude",
      type: "text",
      name: "longitude",
      placeholder: "Longitude"
    },
    {
      id: 11,
      label: "Expiry Date",
      type: "datetime-local",
      placeholder: "Expiry Date",
      name: "expiry_date"
    },
    {
      id: 12,
      label: "Vin Number",
      type: "text",
      placeholder: "Vin Number",
      name: "Vin_Number"
    },
  ]

  export const bidInputs = [
    {
      id: 1,
      label: "Bid Amount",
      type: "number",
      placeholder: "Bid Amount",
      name: "bid_amount"
    },
    {
      id: 1,
      label: "",
      type: "number",
      placeholder: "Bid Amount",
      name: "bid_amount"
    },
    {
      id: 1,
      label: "Bid Amount",
      type: "number",
      placeholder: "Bid Amount",
      name: "bid_amount"
    },
  ]

  export const  buyRequestInputs = [
    {
      id: 1,
      label: "Item Type",
      type: "text",
      placeholder: "Item Type",
      name: "ItemType"
    },
    {
      id: 2,
      label: "Requested Price",
      type: "number",
      placeholder: "Requested Price",
      name: "RequestedPrice"
    },
    {
      id: 3,
      label: "Status",
      type: "text",
      placeholder: "Status",
      name: "Status"
    },
    {
      id: 4,
      label: "Request Time",
      type: "datetime-local",
      placeholder: "Request Time",
      name: "RequestTime"
    },
  ]


  export const  catelogInputs = [
    {
      id: 1,
      label: "Catelog",
      type: "File",
      placeholder: "Catelog",
      name: "Catelog"
    }
  ]

  export const transmissionTypes = [
    {
      name:  'Manual'
    },
    {
      name:  'Automatic'
    },
    {
      name:  'Semi-Auto'
    },
    {
      name:  'Triptronic'
    }
  ]

  export const exteriorColorTypes = [
    {
      name:  'Black'
    },
    {
      name:  'Blue'
    },
    {
      name:  'Brown'
    },
    {
      name:  'Burgundy'
    },
    {
      name:  'Gold'
    },
    {
      name:  'Grey'
    },
    {
      name:  'Orange'
    },
    {
      name:  'Green'
    },
    {
      name:  'Purple'
    },
    {
      name:  'Red'
    },
    {
      name:  'Silver'
    },
    {
      name:  'Beige'
    },
    {
      name:  'Tan'
    },
    {
      name:  'Teal'
    },
    {
      name:  'White'
    },
    {
      name:  'Yellow'
    },
  ]

  export const emirateTypes = [
    {
      name: 'Abu Dhabi'
    },
    {
      name: 'Sharjah'
    },
    {
      name: 'Umm Al Quwah'
    },
    {
      name: 'Dubai'
    },
    {
      name: 'Ajman'
    },
    {
      name: 'Fujairah'
    },
    {
      name: 'Ras Al Khaimah'
    },
  ]

  export const warrantyTypes = [
    {
      name: 'Under Warranty'
    },
    {
      name: 'No Warranty'
    },
    {
      name: "Desn't Apply"
    },
  ]

  export const specsTypes = [
    {
      name: 'American Specs'
    },
    {
      name: 'European Specs'
    },
    {
      name: 'GCC Specs'
    },
    {
      name: 'Japanese Specs'
    },
    {
      name: 'Other Specs'
    },
  ]

  export const powerTypes = [
    {
      name: 'Less than 150 HP'
    },
    {
      name: '150-200'
    },
    {
      name: '200-250'
    },
    {
      name: '250-300'
    },
    {
      name: '300-400'
    },
    {
      name: '400-500'
    },
    {
      name: '500-600'
    },
    {
      name: '600-700'
    },
    {
      name: '700-800'
    },
    {
      name: '800-900'
    },
    {
      name: '900+ HP'
    },
    {
      name: 'Unknown'
    },
  ]

  export const cylinderTypes = [
    {
      name: '2'
    },
    {
      name: '3'
    },
    {
      name: '4'
    },
    {
      name: '5'
    },
    {
      name: '6'
    },
    {
      name: '8'
    },
    {
      name: '12'
    },
    {
      name: 'Unknown'
    },
  ]

  export const conditionTypes = [
    {
      name: 'Used'
    },
    {
      name: 'Certified Pre-Owned (CPO)'
    },
    {
      name: 'Salvage'
    },
    {
      name: 'Classic'
    },
  ]

  export const categoryARTypes = [
    {
      name: 'قابل للتحويل'
    },
    {
      name: 'زوج'
    },
    {
      name: 'عبور'
    },
    {
      name: 'هاتشباك'
    },
    {
      name: 'شاحنة صغيرة'
    },
    {
      name: 'سيدان'
    },
    {
      name: 'رياضات'
    },
    {
      name: 'سيارات الدفع الرباعي'
    }
  ]

  export const transmissionARTypes = [
    {
      name: 'يدوي'
    },
    {
      name: 'تلقائي'
    },
    {
      name: 'شبه أوتوماتيكي'
    },
    {
      name: 'تيبترونيك'
    },
  ]

  export const fuelARTypes = [
    {
      name: 'بنزين (بنزين)'
    },
    {
      name: 'ديزل'
    },
    {
      name: 'هجين'
    },
    {
      name: 'كهربائي'
    },
    {
      name: 'وقود حيوي'
    },
  ]

  export const conditionARTypes = [
    {
      name: 'مستخدم'
    },
    {
      name: 'تصديق قبل الملكية'
    },
    {
      name: 'استخلاص'
    },
    {
      name: 'كلاسيك'
    },
    {
      name: 'كلاسيك'
    },
  ]