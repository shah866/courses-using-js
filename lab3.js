let data = [];

function addNewCourse(cname) {
    // Check if the course already exists
    if (data.some(course => course.name === cname)) {
        console.log('Course already exists:', cname);
        return; // Exit the function if the course already exists
    }

    const el = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = cname;

    el.appendChild(label);

    // Assign id and class to the div
    el.id = cname;
    el.classList.add('course');

    const ob = { name: cname, isConfirmed: false };
    data.push(ob); // Push the new course object to the data array
    console.log(data);

    const editBtn = document.createElement('button');
    editBtn.innerHTML = "EDIT";
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => {
        var userInput = window.prompt("Please enter the course name:", cname);
        updateData(cname, userInput);
        cname=userInput;
      
   
    });

    const delBtn = document.createElement('button');
    delBtn.innerHTML = "Delete";
    delBtn.classList.add('delete');
    delBtn.addEventListener('click', () => {
       el.remove();
       deleteCourse(cname);
       
    });

    const confirmBtn = document.createElement('button');
    confirmBtn.innerHTML = "Confirm";
    confirmBtn.classList.add('confirm');
    confirmBtn.onclick = function() {
        el.removeChild(editBtn);
        el.removeChild(delBtn);
        el.removeChild(confirmBtn);
        confirmCourse(cname);
    };

    el.append(editBtn);
    el.append(delBtn);
    el.append(confirmBtn);

    document.getElementById('mm').append(el);
}

function updateData(oldValue, newValue) {
    const element = document.getElementById(oldValue);
    if (element) {
        // Update the text content of the label
        const label = element.querySelector('label');
        label.textContent = newValue;
        element.id = newValue; // Update the ID as well
    } else {
        console.error('Element with old value not found');
        return;
    }

    // Update the data array
    const index = data.findIndex(course => course.name === oldValue);
    if (index !== -1) {
        data[index].name = newValue;
    } else {
        console.error('Course not found in data array');
    }

    console.log(data);
}







function deleteCourse(courseName) {
    data = data.filter(course => course.name !== courseName);
    console.log(data);
}

function confirmCourse(courseName) {
    const course = data.find(course => course.name === courseName);
    if (course) {
        course.isConfirmed = true;
    }
    console.log(data);
}
// Define the fetchAndDisplayData function
// function fetchAndDisplayData() {
//     console.log('hi');
// //     fetch('display.php')
// //         .then(response => response.json())
// //         .then(data => {
// //             // Iterate over data and display each course
// //             data.forEach(course => {
// //             console.log(course);
// //             });
// //         })
// //         .catch(error => {
// //             console.error('Error:', error);
// //         });
// // }
// }

function saveToDatabase() {
    let manualJSON = {};

    data.forEach((course, index) => {
        manualJSON[index] = {
            name: course.name,
            isConfirmed: course.isConfirmed
        };
    });

    console.log(JSON.stringify(manualJSON, null, 2));

    fetch('lab.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(manualJSON),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // <-- Change to text() to see the response content
    })
    .then(data => {
        console.log('Response:', data); // <-- Log the response here
    })
    .catch(error => {
        console.error('Error:', error);
    });

  
  
}
// function displayCourse(courseObj) {
//     const { name, isConfirmed } = courseObj;

//     // Check if the course already exists
//     if (data.some(course => course.name === name)) {
//         console.log('Course already exists:', name);
//         return; // Exit the function if the course already exists
//     }

//     const el = document.createElement('div');
//     const label = document.createElement('label');
//     label.textContent = name;

//     el.appendChild(label);

//     // Assign id and class to the div
//     el.id = name;
//     el.classList.add('course');

//     // Add buttons if the course is not confirmed
//     if (!isConfirmed) {
//         const editBtn = document.createElement('button');
//         editBtn.innerHTML = "EDIT";
//         editBtn.classList.add('edit');
//         editBtn.addEventListener('click', () => {
//             var userInput = window.prompt("Please enter the course name:", name);
//             updateData(name, userInput);
//         });

//         const delBtn = document.createElement('button');
//         delBtn.innerHTML = "Delete";
//         delBtn.classList.add('delete');
//         delBtn.addEventListener('click', () => {
//             el.remove();
//             deleteCourse(name);
//         });

//         const confirmBtn = document.createElement('button');
//         confirmBtn.innerHTML = "Confirm";
//         confirmBtn.classList.add('confirm');
//         confirmBtn.onclick = function() {
//             el.removeChild(editBtn);
//             el.removeChild(delBtn);
//             el.removeChild(confirmBtn);
//             confirmCourse(name);
//         };

//         el.append(editBtn);
//         el.append(delBtn);
//         el.append(confirmBtn);
//     }

//     document.getElementById('mm').append(el);
// }



// Other functions and code go here...

// Call fetchAndDisplayData when the page loads
//window.onload = fetchAndDisplayData;




