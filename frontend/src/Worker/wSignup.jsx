function WorkerSignup() {
    function toggleOtherInput(event) {
      const otherInput = document.getElementById('otherInput');
      if (event.target.value === 'other') {
        otherInput.style.display = 'block'; // Show the input field
      } else {
        otherInput.style.display = 'none'; // Hide the input field
      }
    }
  
    return (
      <div id="wosignup">
        <h1>Worker Signup</h1>
        <form
        onSubmit={async (event) => {
                event.preventDefault(); // Prevent page reload

                // Gather form data
                const username = event.target.username.value;
                const password = event.target.password.value;

                try {
                    // Send the form data to the backend
                    const response = await fetch('http://localhost:5000/api/signup', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password }),
                    });

                    // Handle the server response
                    const result = await response.json();
                    if (response.ok) {
                        alert('Signup successful!');
                    } else {
                        alert('Signup failed: ' + result.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred while signing up.');
                }
            }}
        >
          <label className="lb">Username<span>*</span></label>
          <input type="text" id="username" name="username" required />
          <br /><br />
          <label className="lb">Password<span>*</span></label>
          <input type="password" id="password" name="password" required />
          <br /><br />
          <label className="lb">Confirm Password<span>*</span></label>
          <input type="password" id="cpassword" name="cpassword" required />
          <br /><br />
          <label className="lb">Contact No.<span>*</span></label>
          <input type="text" id="contact" name="contact" required />
          <br /><br />
          <label className="lb">Type<span>*</span></label>
          <select onChange={toggleOtherInput}>
            <option value="carpenter">Carpenter</option>
            <option value="plumber">Plumber</option>
            <option value="electrician">Electrician</option>
            <option value="other">Other</option>
          </select>
          <input type="text" id="otherInput" style={{ display: 'none' }} placeholder="Please specify" />
          <br /><br />
          <input type="submit" value="Signup" id="wssubmit" />
          <br /><br />
          <p>Already have an account! <a href="/src/worklogin">Login</a></p>
        </form>
      </div>
    );
  }
  
  import { createRoot } from 'react-dom/client';
  const csign = createRoot(document.getElementById('workersignup'));
  csign.render(<WorkerSignup />);
  