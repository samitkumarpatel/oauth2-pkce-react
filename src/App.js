import './App.css';
import getPkce from 'oauth-pkce';

function App() {
  
  const login = () => {

    getPkce(50, (error, { verifier, challenge }) => {
      sessionStorage.setItem('pkce', JSON.stringify({verifier, challenge}))
      return window.location.href = `http://localhost:8080/oauth2/authorize?response_type=code&client_id=spa-client&scope=openid&code_challenge_method=S256&code_verifier=${verifier}&code_challenge=${challenge}&redirect_uri=http://localhost:3000/callback`
    });
  }

  return (
    <div className="login">
        <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
