;(function () {
    'use strict';

    // Define the RSVP events and current state
    const rsvpEvents = ['Mehendi', 'Haldi', 'Sangeet', 'Wedding', 'Vratam'];
    let rsvpResponses = {}; // Object to store user responses

    // Function to open the RSVP pop-up with all events
    function openRSVPPopup() {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = ''; // Clear previous content

        // Populate the pop-up with events and Yes/No buttons
        rsvpEvents.forEach(event => {
            // Create a container for each event
            const eventContainer = document.createElement('div');
            eventContainer.className = 'event-container';

            // Create a label for the event
            const eventLabel = document.createElement('span');
            eventLabel.textContent = event;

            // Create the "Yes" button
            const yesButton = document.createElement('button');
            yesButton.textContent = 'Yes';
            yesButton.className = 'btn btn-yes';
            yesButton.onclick = () => setRSVPResponse(event, 'Yes', yesButton, noButton);

            // Create the "No" button
            const noButton = document.createElement('button');
            noButton.textContent = 'No';
            noButton.className = 'btn btn-no';
            noButton.onclick = () => setRSVPResponse(event, 'No', noButton, yesButton);

            // Append label and buttons to the event container
            eventContainer.appendChild(eventLabel);
            eventContainer.appendChild(yesButton);
            eventContainer.appendChild(noButton);

            // Append the event container to the list in the modal
            eventsList.appendChild(eventContainer);
        });

        // Show the pop-up modal
        document.getElementById('rsvpModal').style.display = 'block';
    }

    // Function to capture user response for each event and change button colors
    function setRSVPResponse(event, response, selectedButton, otherButton) {
        // Save the response in the rsvpResponses object
        rsvpResponses[event] = response;

        // Highlight the selected button and reset the other button
        selectedButton.style.backgroundColor = response === 'Yes' ? '#4CAF50' : '#f44336'; // Green for Yes, Red for No
        selectedButton.style.color = '#fff'; // Change text color to white
        otherButton.style.backgroundColor = '#e0e0e0'; // Reset the other button's color
        otherButton.style.color = '#000'; // Reset text color to black
    }

    // Function to close the RSVP pop-up
    function closeRSVPPopup() {
        document.getElementById('rsvpModal').style.display = 'none';
    }

    // Function to submit the RSVP form with all responses
    function submitRSVPForm() {
        const form = document.getElementById('rsvpForm');

        // Append responses to the form as hidden inputs
        for (const [event, response] of Object.entries(rsvpResponses)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = event.toLowerCase(); // Use event name in lowercase
            input.value = response;
            form.appendChild(input);
        }

        // Get the number of attendees from the input field
        const attendeesInput = document.querySelector('input[name="attendees"]');
        if (attendeesInput && attendeesInput.value) {
            // Append the number of attendees as a hidden input
            const attendeesCountInput = document.createElement('input');
            attendeesCountInput.type = 'hidden';
            attendeesCountInput.name = 'number_of_attendees';
            attendeesCountInput.value = attendeesInput.value;
            form.appendChild(attendeesCountInput);
        }

        // Submit the form to Formspree
        form.submit();
    }

    // Attach the functions to the global window object to ensure accessibility
    window.openRSVPPopup = openRSVPPopup;
    window.closeRSVPPopup = closeRSVPPopup;
    window.submitRSVPForm = submitRSVPForm;

})();
