import { Button, Col } from 'react-bootstrap';
import axios from 'axios';
import constants from '../../util/constants';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// this component is called with read = false and read = true
const Messages = ({read}) => {
    const [messages, setMessages] = useState([])

    // pull all messages from the db
    const RequestMessages = async (setProductsList) => {
        try
        {
            // from now on im gonna use authorization with bearer instead of putting the token in the json body :D
            // much easier this way
            const requestConfig = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            };

            const response = await axios.get(`${constants.BACKEND_API_URL}/messages`, requestConfig);
            
            setMessages(response.data);
        }
        catch (error)
        {
            console.log(error);
        }      
    }
    
    const RequestArchiveMessage = async (id) => {
        try
        {
            const requestConfig = {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
            };

            const requestBody = {
                data: { id, read:true }
            }

            const response = await axios.patch(`${constants.BACKEND_API_URL}/messages`, requestBody, requestConfig);

            // also on the client side set read to true
            let newMessagesArray = [...messages];
            newMessagesArray.find(message=>message.id===id).read = true;

            setMessages(newMessagesArray);
        }
        catch (error)
        {
            console.log(error.response.data.message, { position: 'top-center' });
        }     
    }

    useEffect(()=> {
        RequestMessages();
    }, []);

    const Message = ({id, name, email, phoneNumber, messageString}) => {
        return (
            <div className='border-bottom mb-3 p-3'>
                <h6>{name}, {email}, {phoneNumber}</h6>
                <p>{messageString}</p>
                { !read ?
                    <Button variant='outline-primary mb-2' onClick={()=>{RequestArchiveMessage(id)}}>Archive</Button>
                    : 
                    <></>
                }
                
            </div>
        );
    }

    return (
        <div className='unread-messages-container wrap-scroll-view shadow rounded'>
            {messages.map((message) =>
                {
                        // if read === true we only want to show messages which read is true

                    if ((message.read && !read) || (!message.read && read))
                        return (<></>);
                    else
                        return <Message id={message.id} name={message.name} email={message.email} phoneNumber={message.phone_number} messageString={message.message}/>
                }                
            )}
        </div>
    );
}

export default Messages;