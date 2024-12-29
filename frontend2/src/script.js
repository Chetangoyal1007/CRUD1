const apiUrl = 'http://localhost:4000/api';  // Backend API URL

// Fetch and display all users
function fetchUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';  // Clear the list before updating

            users.forEach(user => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${user.name} - ${user.email} - ${user.phoneno}
                    <button class="edit-btn" onclick="editUser('${user._id}')">Edit</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                `;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Create or update a user
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const fathername = document.getElementById('fathername').value;
    const email = document.getElementById('email').value;
    const phoneno = document.getElementById('phoneno').value;

    const user = { name, fathername, email, phoneno };

    const formTitle = document.getElementById('form-title');
    const buttonText = document.querySelector('form button').textContent;

    // Check if we are in Create or Update mode
    if (buttonText === 'Create User') {
        // Create new user
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers(); // Refresh the list
            clearForm();  // Clear the form
        })
        .catch(error => console.error('Error creating user:', error));
    } else if (buttonText === 'Update User') {
        // Update existing user
        const userId = document.getElementById('user-id').value;
        fetch(`${apiUrl}/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers(); // Refresh the list
            clearForm();  // Clear the form
            document.querySelector('form button').textContent = 'Create User'; // Reset button text
            formTitle.textContent = 'Create User'; // Reset form title
        })
        .catch(error => console.error('Error updating user:', error));
    }
});

// Edit a user
function editUser(userId) {
    fetch(`${apiUrl}/${userId}`)
        .then(response => response.json())
        .then(user => {
            // Fill the form with user data
            document.getElementById('name').value = user.name;
            document.getElementById('fathername').value = user.fathername;
            document.getElementById('email').value = user.email;
            document.getElementById('phoneno').value = user.phoneno;
            document.getElementById('user-id').value = user._id;

            // Change form to update mode
            document.querySelector('form button').textContent = 'Update User';
            document.getElementById('form-title').textContent = 'Edit User';
        })
        .catch(error => console.error('Error fetching user data for edit:', error));
}

// Delete a user
function deleteUser(userId) {
    fetch(`${apiUrl}/${userId}`, { method: 'DELETE' })
        .then(() => fetchUsers())  // Refresh user list after deletion
        .catch(error => console.error('Error deleting user:', error));
}

// Clear the form fields
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('fathername').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneno').value = '';
    document.getElementById('user-id').value = ''; // Clear user ID field
}

// Initial fetch of users when the page loads
fetchUsers();
