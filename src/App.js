import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';

const socket = io('http://localhost:4000');

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socket.off('message');
    }, []);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom>Chat Application</Typography>
            <Paper style={{ padding: '20px', maxHeight: '400px', overflow: 'auto' }}>
                {messages.map((msg, index) => (
                    <Typography key={index} variant="body1">{msg}</Typography>
                ))}
            </Paper>
            <TextField 
                label="Message"
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={sendMessage}
            >
                Send
            </Button>
        </Container>
    );
}

export default App;

