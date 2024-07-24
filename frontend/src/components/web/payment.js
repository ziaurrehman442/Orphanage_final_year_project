import React, { useState } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import PaymentForm from "./paymentform";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { t } = useTranslation();
  const [deposit, setDeposit] = useState('1');
  const [steps, setStep] = useState('1');
  const user = useState(JSON.parse(sessionStorage.getItem('user')) || {});
    const users = user[0].data[0];
    const navigate = useNavigate();

  const Deposit = ({ deposit, step }) => {
    const [state2, setState2] = useState('1');

    return (
      <div className="step2">
        {deposit !== '1' && step === '2' && deposit === 'Bank' && (
          <>
            <div className="row m-3">
              <h4 style={{ color: "black" }} align="center" className="m-2">Step 2</h4>
              <h3 style={{ color: "black" }} align="center">
                Please select one of the following
              </h3>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card" onClick={() => { setState2("new"); setStep('3'); setDeposit('new')}}>
                  <img className="card-img-top" src="/dontHaveSlip.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                  <div className="card-body">
                    I want to make a new deposit
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card" onClick={() => { setState2("alreadyd"); setStep('3'); setDeposit('alreadyd')}}>
                  <img className="card-img-top" src="/haveSlip.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                  <div className="card-body">
                    I already have a deposit slip
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {(deposit === 'Cash' || deposit === 'Cheque') && (
          <div className="col-md-6" style={{ color: "black" }}>
            <div className="card" onClick={() => { setState2("already"); setStep('3'); }}>
              <img className="card-img-top" src="/ChequeNotSelected21.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
              <div className="card-body">
                <h2 style={{ color: "black", fontSize: '30px' }}>{deposit}</h2>
                <p style={{ color: "black", fontSize: '15px' }}>
                  Cheque/Cash must be submitted to one of Emirates Auctions' branches in person.
                  <br />
                  Submit a cheque/Cash of required bidding limit
                  <br />
                  Your bidding limit will be instantly updated once you submit your security cheque/Cash.
                </p>
                <br/><br/>
                <p style={{ color: "black" }}><a href="https://maps.app.goo.gl/5fudwkaSDGkwDs6P7" target="_blank" title="Open Google Maps">{t('Location')}</a></p>
              </div>
            </div>
          </div>
        )}
        <Step3 state={deposit} />
      </div>
    );
  };

  const Step3 = ({ state }) => {
    console.log(state,steps);
    return (
      <div className="step3">
        {state !== null && steps === '3' && state === 'new' && (
          <>
            <div className="row m-3">
              <h4 style={{ color: "black" }} align="center" className="m-2">Step 3</h4>
              {/* <h3 style={{ color: "black" }} align="center">
                Please select one of the following
              </h3> */}
            </div>
              <div className="row">
                <div className="col-md-6" style={{height: '100%'}}>
                  <div className="card">
                    <img className="card-img-top" src="/dontHaveSlip.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                    <div className="card-body">
                      Bank Name: sdfjhjfasfjfj <br />
                      Swift code: sdfjhjfasfjfj <br />
                      Holder name: sdfjhjfasfjfj <br />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card"  onClick={() => { setStep('3'); setDeposit('alreadyd')}}>
                    <img className="card-img-top" src="/dontHaveSlip.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                    <div className="card-body">
                      Click After Getting Deposit receipt
                    </div>
                  </div>
                </div>
              </div>
          </>
        )}


{state !== null && steps === '3' && state === 'alreadyd' && (
          
            navigate('/user/dashboard/paymentform')
          
        )}
      </div>
    );
  };


  return (
    <div>
      {steps === '1' && (
        <>
          <div className="row">
            <div className="col-md-11 bold-cont">
              <div className="row">
                <div className="col">
                  <h3 style={{ marginTop: '10px' }}>{t("Ab")}</h3>
                </div>
                <div className="col" align="right" style={{ marginTop: '10px' }}>
                  <h3><span style={{ color: "red" }}>{users.payment}</span>{t("currency")}</h3>
                </div>
              </div>
            </div>
          </div>
          <h1 align="center" style={{ color: "#C69944", fontSize: '40px', lineHeight: '50px', margin:'0 0 10px' }}>
            Deposit Amount
          </h1>
          <div className="row">
            <div className="col-md-4" align="center">
              <div className="card" onClick={() => { setDeposit("Bank"); setStep('2'); }} style={{ width: '19rem', marginTop: "10px" }}>
                <img className="card-img-top" src="/BankTransferNotSelected.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                <div className="card-body">
                  <h4 align="center" style={{ color: "#C69944" }}>
                    Bank Deposit/Bank Transfer
                  </h4>
                  <p className="card-text" style={{ color: "black", fontSize: "small" }}>
                    Deposit 20% of your required bidding limit
                    <br />
                    Must submit bank receipt
                    <br />
                    Allow 48 hrs to update your account
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" align="center">
              <div className="card" onClick={() => { setDeposit("Cheque"); setStep('2'); }} style={{ width: '19rem', marginTop: "10px", height: "100%" }}>
                <img className="card-img-top" src="/ChequeNotSelected2.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                <div className="card-body">
                  <h4 align="center" style={{ color: "#C69944" }}>
                    Cheque
                  </h4>
                  <p className="card-text" style={{ color: "black", fontSize: "small" }}>
                    Submit a cheque of required bidding limit
                    <br />
                    Limit updates immediately
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4" align="center">
              <div className="card" onClick={() => { setDeposit("Cash"); setStep('2'); }} style={{ width: '19rem', marginTop: "10px", height: "100%" }}>
                <img className="card-img-top" src="/BankTransferNotSelected.svg" alt="Card image cap" style={{ width: '50%', marginLeft: "25%" }} />
                <div className="card-body">
                  <h4 align="center" style={{ color: "#C69944" }}>
                    Cash Deposit
                  </h4>
                  <p className="card-text" style={{ color: "black", fontSize: "small" }}>
                    Deposit 20% of your required bidding limit
                    <br />
                    Deposit in Branch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Deposit deposit={deposit} step={steps} />
    </div>
  );
};

export default Payment;
