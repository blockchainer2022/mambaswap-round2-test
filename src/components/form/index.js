import { useState } from "react";
import Button from "../button";
import "./style.css";
import Mamba from "../../assets/images/Mamba.png";
import Bnb from "../../assets/images/logo.png";
import WalletPopup from "../walletpopup";
import moment from "moment";
const Index = ({
  icoPrice = 0,
  account,
  buy,
  bnbBalance = 0,
  userTokenBalance,
  loadWeb3,
  loadWalleConnect,
  startTime,
  endTime,
}) => {
  // console.log(endTime < +Date.now());
  // console.log(+Date.now());
  const [bnb, setBnb] = useState("");
  const [mamba, setMamba] = useState("");
  const [walletOpen, setWalletOpen] = useState(false);
  const bnbHandler = (e) => {
    const reg = /^\d*\.?\d*$/;
    if (reg.test(e.target.value)) {
      setBnb(e.target.value);
      setMamba(Number(icoPrice) * e.target.value);
    }
  };
  const mambaHandler = (e) => {
    const reg = /^\d*\.?\d*$/;
    if (reg.test(e.target.value)) {
      setMamba(e.target.value);
      setBnb(e.target.value / Number(icoPrice));
    }
  };
  const total2 = new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(icoPrice);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!account) {
      setWalletOpen((prev) => !prev);
    }
    if (account) {
      buy(Number(bnb));
    }
  };

  var s = new Date(Number(startTime * 1000)).toUTCString();
  var e = new Date(Number(endTime * 1000)).toUTCString();
  const start = +new moment(`${s}`).utc() > +new Date();
  const end = +new moment(`${e}`).utc() < +new Date();

  return (
    <>
      <div
        className="w-full  dark:text-gray-50 dark:bg-dark rounded-xl"
        style={{ boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.16)" }}
      >
        <p className="block text-sm font-medium py-3 px-5 uppercase border-b-2 border-gary-400 dark:border-gray-500 ">
          Swap
        </p>
        <form
          action=""
          className="max-w-sm mx-auto px-4 pt-3 pb-6"
          onSubmit={submitHandler}
        >
          <div className="mt-4">
            <Field value={bnb} handler={bnbHandler} balance={bnbBalance} />
            <span className="block text-center text-base my-1">
              <i className="fas fa-arrow-down"></i>
            </span>
            <Field
              label1="Receive"
              icon={Mamba}
              name="MAMBA"
              value={mamba}
              handler={mambaHandler}
              balance={userTokenBalance}
            />
            <span className="block text-xs mt-2 text-gray-500 text-center">
              1 BNB = {total2} MAMBA
            </span>
            <div className={`mt-8 swapbtn ${start || end ? "active" : null}`}>
              <Button secondary={true}>
                {account ? "Swap To Mamba" : "Connect Wallet"}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <WalletPopup
        open={walletOpen}
        onClose={setWalletOpen}
        title={account ? "Disconnect Wallet" : "Select a Wallet"}
        text={
          account
            ? "Are you sure you want to disconnect?"
            : "Please select a wallet to connect to this dapp:"
        }
        metaMaskHandler={loadWeb3}
        account={account}
        loadWalleConnect={loadWalleConnect}
      />
    </>
  );
};

export default Index;

const Field = ({
  label1 = "Pay",
  icon = Bnb,
  name = "BNB",
  balance,
  value,
  handler,
}) => {
  return (
    <div className="">
      <div className="text-sm flex justify-between items-center mb-1">
        <span className="font-medium">{label1}</span>
        <span className=" text-xs dark:text-gray-400">
          Available balance : {Number(balance).toFixed(4)}
        </span>
      </div>
      <div className="h-14 w-full rounded-xl field">
        <input
          type="text"
          className="h-full w-full rounded-xl dark:bg-mainDark bg-transparent border-2 border-gray-400"
          placeholder="0"
          value={value}
          onChange={handler}
        />
        <div className="currency">
          <img src={icon} alt="" className="w-6 mr-2" />
          <span className="text-xs uppercase dark:text-gray-50">{name}</span>
        </div>
      </div>
    </div>
  );
};
