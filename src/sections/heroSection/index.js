import { useState, useEffect } from "react";
import { Timer, Form, Progress } from "../../components";
import moment from "moment";
import "./style.css";

const Index = ({
  account,
  buy,
  totalSupply,
  tokenSold,
  bnbBalance,
  icoPrice,
  userTokenBalance,
  loadWeb3,
  loadWalleConnect,
  startTime,
  endTime,
}) => {
  var e = new Date(Number(endTime * 1000)).toUTCString();
  var s = new Date(Number(startTime * 1000)).toUTCString();
  const start = +new moment(`${s}`).utc() > +new Date();
  // const end = +new moment(`${s} 00:00:00`).utc() < +new Date();

  const difference = +new moment(`${start ? s : e}`).utc() - +new Date();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      if (difference > 0) {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((difference / 1000 / 60) % 60));
        setSeconds(Math.floor((difference / 1000) % 60));
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return (
    <section className="pt-6 pb-2 text-dark">
      <div className="container">
        <div className="max-w-xl w-full mx-auto">
          <Timer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            startTime={startTime}
            endTime={endTime}
          />
          <Progress
            totalSupply={totalSupply}
            tokenSold={tokenSold}
            account={account}
          />
          <Form
            icoPrice={icoPrice}
            account={account}
            buy={buy}
            bnbBalance={bnbBalance}
            userTokenBalance={userTokenBalance}
            loadWeb3={loadWeb3}
            loadWalleConnect={loadWalleConnect}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
      </div>
    </section>
  );
};

export default Index;
