import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
const Callback = () => {
    const location = useLocation();
    const [data, setData] = useState(null)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        const pkce = sessionStorage.getItem('pkce') ? JSON.parse(sessionStorage.getItem('pkce')) : undefined
        const code_verifier= pkce['verifier']
        const code_challenge= pkce['challenge']
        if(code && pkce) {

            // axios.post('http://localhost:8080/oauth2/token', {
            //     client_id: 'spa-client',
            //     grant_type: 'authorization_code',
            //     code,
            //     code_challenge,
            //     code_verifier,
            //     code_challenge_method: 'S256',
            //     redirect_uri: 'http://localhost:3000/callback'
            // },
            // {
            //     headers: {
            //     'content-type': 'application/x-www-form-urlencoded'
            //     }
            // })
            // .then((response) => {
            //     console.log(response.data)
            //     setData(response.data.access_token)
            // })
            // .catch((error) => {
            //     console.error('Failed to obtain access token:', error);
            // });

            const params = new URLSearchParams();
            params.append('client_id', 'spa-client');
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('code_verifier', code_verifier);
            params.append('code_challenge', code_challenge);
            params.append('code_challenge_method', 'S256');
            params.append('redirect_uri', 'http://localhost:3000/callback');

            fetch('http://localhost:8080/oauth2/token', {
                method: 'POST',
                credentials: 'include', // Send credentials if needed
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));

        } else {
            console.log('code or pkce is missing')
        }
        
    },[location.search])
    
    return (
        <div>
            <h2>Callback Page</h2>
            <pre>{data}</pre>
            <a href='http://localhost:8080/logout'>Logout</a>
        </div>
    )
}

export default Callback