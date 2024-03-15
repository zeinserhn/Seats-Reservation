let arrayLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];
let html = "";
for (let i = 0; i < arrayLetters.length; i++) {
    let arrayLetter = arrayLetters[i];
    for (let i = 1; i <= 20; i++) {
        const arrayTogether = arrayLetter + i;
        html += `<div id="${arrayLetter + i}" class="seat">${arrayTogether}</div>`;
    }
}
document.getElementById('seats').innerHTML = html;


var reservedSeats = {
    record1: {
        seat: "A11",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record2: {
        seat: "A12",
        owner: {
            fname: "joe",
            lname: "Smith"
        }
    },
    record3: {
        seat: "A13",
        owner: {
            fname: "joe",
            lname: "Smith"
        }
    },
    record4: {
        seat: "A14",
        owner: {
            fname: "joe",
            lname: "Smith"
        }
    }

};
for (const key in reservedSeats) {
    const obj = reservedSeats[key];
    console.log(obj.seat);
    document.getElementById(obj.seat).className = 'r';
    document.getElementById(obj.seat).innerHTML = "R";
}
var selectedSeats = [];
var seats = document.querySelectorAll('.seat');
seats.forEach(seat => {
    seat.addEventListener('click', function () {
        seatSelectionProcess(seat.id);
    });
});
function seatSelectionProcess(thisSeat) {
    if (!(document.getElementById(thisSeat).classList.contains('r'))) {
        var index = selectedSeats.indexOf(thisSeat);
        if (index > -1) {
            selectedSeats.splice(index, 1);
            document.getElementById(thisSeat).className = "seat";
        }
        else {
            selectedSeats.push(thisSeat);
            document.getElementById(thisSeat).className = "s";
        }
        manageForm();
    }
}

document.getElementById('reserve').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('resForm').style.display = "block";
});
document.getElementById('cancel').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('resForm').style.display = "none";
});
function manageForm() {
    if (selectedSeats.length > 0) {
        document.getElementById('confirmed').style.display = "block";
        if (selectedSeats.length === 1) {
            document.getElementById('selectedSeats').innerHTML = `you have selected seat ${selectedSeats[0]}`;
        }
        else {
            var seatsString = selectedSeats.toString();
            document.getElementById('selectedSeats').innerHTML = `you have selected seats ${seatsString}`;
        }
    }
    else {
        document.getElementById('confirmed').style.display = "none";
        document.getElementById('selectedSeats').innerHTML = '<p>you need to select some seats to reserve <br><a href="#" id="error">Close </a>this dialog box and pick at least one seat</p>';
        document.getElementById('error').addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('resForm').style.display = "none";
        });
    }
}
manageForm();
document.getElementById('confirmed').addEventListener('submit', function (event) {
    event.preventDefault();
    processReservation();
});

function processReservation() {
    const nbOfRecords = Object.keys(reservedSeats).length;
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    let counter = 1;
    let nextRecords = '';
    selectedSeats.forEach(thisseat => {
        document.getElementById(thisseat).className = 'r';
        document.getElementById(thisseat).innerHTML = 'R';
        nextRecords = `record${nbOfRecords + counter}`;
        selectedSeats[nextRecords] = {
            seat: thisseat,
            owner: {
                fname: fname,
                lname: lname
            }
        };
        counter++;
    });
}

