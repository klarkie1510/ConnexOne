import { useEffect, useState } from 'react';
import './App.css'
import Metrics from './components/Metrics';
import Timer, { ITimer } from './components/Timer';

function App() {

  const [isFetchingResources, setIsFetchingResources] = useState(true);

  const [isWaitingOnTime, setIsWaitingOnTime] = useState(true);
  const [lastServerTime, setLastServerTime] = useState<ITimer>();

  const [isWaitingOnMetrics, setIsWaitingOnMetrics] = useState(true);
  const [latestMetrics, setLatestMetrics] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => { setIsFetchingResources(true) }, 30000);
    return function cleanup() {
        clearInterval(interval);
    };
  }, [isFetchingResources])

  async function fetchTime() {
    setIsWaitingOnTime(true);
    sendGet("http://127.0.0.1:3000/time").then((res) => {
      return  res.json();
    }).then((data: ITimer) => {
        setIsWaitingOnTime(false);
        setLastServerTime(data)
    })
  }

  function fetchMetrics() {
    setIsWaitingOnMetrics(true);
    sendGet("http://127.0.0.1:3000/metrics").then((res) => {
      return res.text();
    }).then((data: string) => {
        setIsWaitingOnMetrics(false);
        setLatestMetrics(data);
    })
  }

  function sendGet(url: string) {
    return fetch(url, {
      headers: new Headers({
        'Authorization': 'mysecrettoken'
      })
    });
  }

  if(isFetchingResources) {
    fetchTime();
    fetchMetrics();
    setIsFetchingResources(false);
  }

  return (
    <div className="app-container">
      <div className="container">
        {
          (isWaitingOnTime || !lastServerTime) ? <div className="loading">Loading</div> : <Timer epoch={lastServerTime.epoch} />
        }
      </div>
      <div className="container">
        {
          (isWaitingOnMetrics || !latestMetrics) ? <div className="loading">Loading</div> : <Metrics metrics={latestMetrics}/>
        }
      </div>
    </div>
  );
}

export default App
