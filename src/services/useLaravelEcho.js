import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import {useEffect, useState} from 'react';

export const useLaravelEcho = (user) => {
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        Pusher.logToConsole = true;

        window.Pusher = Pusher;

        const newEcho = new Echo({
            broadcaster: 'pusher',
            key: process.env.REACT_APP_PUSHER_KEY,
            cluster: 'eu',
            forceTLS: false,
            withCredentials: true,
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        axios.post(process.env.REACT_APP_CHANNEL_AUTH, {
                            socket_id: socketId,
                            channel_name: channel.name
                        }, {
                            withCredentials: true
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
