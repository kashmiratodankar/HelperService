function CustomerLogin() {
    const handleLogin = async (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      
      try {
          const response = await fetch('http://localhost:5000/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password }),
          });
  
          const result = await response.json();
          
          console.log('Response:', result);  // Log the full response to see what is returned
  
          if (response.ok) {
              // Store JWT token in localStorage
              localStorage.setItem('authToken', result.token);
  
              // Print the token in the web console
              console.log('JWT Token:', result.token);
  
              // Redirect to the protected page with username in URL query string
              window.location.href = `/src/Customer/custhome?username=${username}`;
          } else {
              alert('Login failed: ' + result.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while logging in.');
      }
  };
  
  
  
    return (
        <div id="culogin">
            <h1>Customer Login</h1>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input type="text" name="username" required />
                <br />
                <label>Password:</label>
                <input type="password" name="password" required />
                <br />
                <button type="submit" id="clsubmit">Login</button>
                <br />
                <br />
                <p>
                    Don&apos;t have an account! <a href="/src/Customer/custsignup">Signup</a>
                </p>
            </form>
        </div>
    );
  }
  
  import { createRoot } from 'react-dom/client';
  const clog = createRoot(document.getElementById("customerlogin"));
  clog.render(<CustomerLogin />);