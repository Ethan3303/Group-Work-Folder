const invoiceData = {
    1: {
        location: "Trinity Leeds Car Park",
        datetime: "07 Mar 2025, 6:20 PM",
        type: "Reserved",
        duration: "2 hours",
        price: "£4.50"
    },
    2: {
        location: "Leeds Dock Parking",
        datetime: "06 Mar 2025, 12:00 PM",
        type: "Instant",
        duration: "1 hour",
        price: "£3.00"
    },
    3: {
        location: "Woodhouse Lane Car Park",
        datetime: "05 Mar 2025, 7:45 PM",
        type: "Reserved",
        duration: "3 hours",
        price: "£5.20"
    },
    4: {
        location: "Q-Park Albion Street",
        datetime: "04 Mar 2025, 10:30 AM",
        type: "Instant",
        duration: "1 hour",
        price: "£4.00"
    },
    5: {
        location: "Wellington Place Parking",
        datetime: "03 Mar 2025, 2:00 PM",
        type: "Reserved",
        duration: "2 hours",
        price: "£6.00"
    },
    6: {
        location: "Leeds Station Short Stay",
        datetime: "02 Mar 2025, 4:10 PM",
        type: "Instant",
        duration: "1 hour",
        price: "£3.80"
    },
    7: {
        location: "Merrion Centre Parking",
        datetime: "01 Mar 2025, 9:50 AM",
        type: "Reserved",
        duration: "2 hours",
        price: "£4.75"
    },
    8: {
        location: "The Light Parking",
        datetime: "29 Feb 2025, 8:30 PM",
        type: "Instant",
        duration: "1.5 hours",
        price: "£5.00"
    },
    9: {
        location: "Granary Wharf Car Park",
        datetime: "28 Feb 2025, 11:15 AM",
        type: "Reserved",
        duration: "2 hours",
        price: "£3.50"
    },
    10: {
        location: "Victoria Leeds Parking",
        datetime: "27 Feb 2025, 1:00 PM",
        type: "Instant",
        duration: "2 hours",
        price: "£6.20"
    }
};

function loadInvoiceData(id) {
    const data = invoiceData[id] || invoiceData[1];

    document.getElementById("invoice-id").textContent = "#" + id;
    document.getElementById("location").textContent = data.location;
    document.getElementById("datetime").textContent = data.datetime;
    document.getElementById("type").textContent = data.type;
    document.getElementById("duration").textContent = data.duration;
    document.getElementById("price").textContent = data.price;
    document.querySelector(".invoice-total").textContent = "Total Paid: " + data.price;
}