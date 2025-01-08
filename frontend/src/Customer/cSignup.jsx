function CustomerSignup() {
    return (
        <div id='cusignup'>
            <h1>Customer Signup</h1>
            <form
                onSubmit={async (event) => {
                    event.preventDefault(); // Prevent page reload

                    // Gather form data
                    const firstName = event.target.firstName.value;
                    const lastName = event.target.lastName.value;
                    const userName = event.target.userName.value; // New field
                    const email = event.target.email.value; // New field
                    const password = event.target.password.value;
                    const confirmPassword = event.target.cpassword.value;
                    const phoneNumber = event.target.phoneNumber.value;
                    const address = event.target.address.value;

                    // Validate if password and confirm password match
                    if (password !== confirmPassword) {
                        alert('Passwords do not match!');
                        return;
                    }

                    // Validate phone number (must be exactly 10 digits)
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(phoneNumber)) {
                        alert('Phone number must be exactly 10 digits.');
                        return;
                    }

                    // Validate email format
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (email && !emailRegex.test(email)) {
                        alert('Please enter a valid email address.');
                        return;
                    }

                    console.log('Sending data:', { firstName, lastName, userName, email, phoneNumber, password, address });

                    try {
                        // Send the form data to the backend
                        const response = await fetch('http://localhost:5000/api/signup', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ firstName, lastName, userName, email, phoneNumber, password, address }),
                        });

                        // Handle the server response
                        const result = await response.json();
                        if (response.ok) {
                            alert('Signup successful! Please log in.');
                            window.location.href = '/src/Customer/custlogin';
                        } else {
                            alert('Signup failed: ' + result.message);
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('An error occurred while signing up.');
                    }
                }}
            >
                <label className='lb'>First Name<span>*</span></label>
                <input type="text" id="firstName" name="firstName" required />
                <br /><br />
                <label className='lb'>Last Name<span>*</span></label>
                <input type="text" id="lastName" name="lastName" required />
                <br /><br />
                <label className='lb'>Username<span>*</span></label>
                <input type="text" id="userName" name="userName" required /> {/* New field */}
                <br /><br />
                <label className='lb'>Email (optional)</label>
                <input type="email" id="email" name="email" /> {/* New field */}
                <br /><br />
                <label className='lb'>Password<span>*</span></label>
                <input type="password" id="password" name="password" required />
                <br /><br />
                <label className='lb'>Confirm Password<span>*</span></label>
                <input type="password" id="cpassword" name="cpassword" required />
                <br /><br />
                <label className='lb'>Phone Number<span>*</span></label>
                <input type="text" id="phoneNumber" name="phoneNumber" required />
                <br /><br />
                <label className='lb'>Address<span>*</span></label>
                <textarea id="address" name="address" required></textarea>
                <br /><br />
                <input type="submit" value="Signup" id='cssubmit' />
                <br /><br />
                <p>Don&apos;t have an account? <a href='/src/Customer/custlogin'>Login</a></p>
            </form>
        </div>
    );
}

import { createRoot } from 'react-dom/client';
const csign = createRoot(document.getElementById("customersignin"));
csign.render(<CustomerSignup />);