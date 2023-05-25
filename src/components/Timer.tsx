import { useEffect, useState } from "react";

export interface ITimer {
    epoch: number
}

export default function Timer(props: ITimer) {

    const [currentTime, setCurrentTime] = useState(new Date().getTime());
    const serverTime = props.epoch;

    function refreshTime() {
        setCurrentTime(new Date().getTime())
    }

    useEffect(() => {
        const timerInterval = setInterval(refreshTime, 1000);
        return function cleanup() {
          clearInterval(timerInterval);
        };
    });

    return (
        <div className="timer-container">
            <h3 className="server-time">{props.epoch}</h3>
            <h3 className="time-since-server">{getTimeSinceServer()}</h3>
        </div>
    );

    function padNum(num: number) {
        if(num < 10) return '0' + num;
        return num;
    }

    function timetoHHMMSS(timeInSeconds: number) {
    
        const hours = padNum(Math.round(timeInSeconds / 3600));
        const seconds = timeInSeconds % 3600;
    
        const minutes = padNum(Math.round(seconds / 60));
        const secondsAsString = padNum(seconds % 60);
    
        return hours + ":" + minutes + ":" + secondsAsString;
    }

    function getTimeSinceServer() {
        const clientTimeinSeconds = Math.round(currentTime / 1000);
        return timetoHHMMSS(clientTimeinSeconds - serverTime    );
    }
}


