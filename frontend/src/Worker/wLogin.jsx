function WorkerLogin(){
    return(
        <div id='wologin'>
            <p id='rev'><a href='/index'>Home</a></p>
            <h1>Worker Login</h1>
            <form>
                <label className='lb'>Username</label>
                <input type="text" id="username" name="username" required />
                <br/><br/>
                <label className='lb'>Password</label>
                <input type="password" id="password" name="password" required />
                <br/><br/>
                <input type="submit" value="Login" id='wlsubmit'/>
                <br/><br/>
                <p>Don&apos;t have an account! <a href='/src/worksignup'>Signup</a></p>
            </form>
        </div>
    )
}

import { createRoot } from 'react-dom/client'
const wlog=createRoot(document.getElementById("workerlogin"))
wlog.render(<WorkerLogin />)
