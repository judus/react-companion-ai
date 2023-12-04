import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import {useEffect, useState} from 'react';
import {useApiWithToken} from "./useApiWithToken";

export const useLaravelEcho = (user) => {
    const [echo, setEcho] = useState(null);
    const api = useApiWithToken();

    useEffect(() => {
        Pusher.logToConsole = true;

        window.Pusher = Pusher;

        const newEcho = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_PUSHER_KEY,
            cluster: 'eu',
            forceTLS: false,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {

                        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

                        axios.post(process.env.REACT_APP_CHANNEL_AUTH, {
                            socket_id: socketId,
                            channel_name: channel.name
                        })
                        .then(response => {
                            callback(null, response.data);
                        })
                        .catch(error => {
                            callback(error);
                        });
                    }
                };
            }
        });

        setEcho(newEcho);

        return () => {
            if(newEcho) {
                // Disconnect Echo when the component unmounts
                newEcho.disconnect();
            }
        };
    }, [user]);

    return echo;
};
