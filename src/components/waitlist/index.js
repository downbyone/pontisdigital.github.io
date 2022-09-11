import { useState } from "react";
import axios from "axios";
import WaitlistModal from "./WaitlistModal";

import LanguageContext from '../../LanguageContext';
import { useContext } from 'react';


const Waitlist = props => {
const {lang} = useContext(LanguageContext);
	//stores the values of the form
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [referral, setReferral] = useState("");

  const [modal, setModal] = useState(0);

  //stores the status of each form field
  const [emailStatus, setEmailStatus] = useState(2);
  const [firstNameStatus, setFirstNameStatus] = useState(2);
  const [lastNameStatus, setLastNameStatus] = useState(2);
  const [phoneStatus, setPhoneStatus] = useState(2);
  const [streetAddressStatus, setStreetAddressStatus] = useState(2);
  const [cityStatus, setCityStatus] = useState(2);
  const [stateStatus, setStateStatus] = useState(2);
  const [zipCodeStatus, setZipCodeStatus] = useState(2);
  const [passwordStatus, setPasswordStatus] = useState(2);
  const [birthdayStatus, setBirthdayStatus] = useState(2);
  const [referralStatus, setReferralStatus] = useState(1);

  //referral code generated by the server
  const [code, setCode] = useState(props.refCode);
  const [modalError, setModalError] = useState("");

  //stores the error messages for each form field
  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
    console.log("Length", event.target.value.length);
    if (event.target.value.length === 0) {
      setEmailStatus(0);
    } else if (
      event.target.value.indexOf("@") === -1 ||
      event.target.value.indexOf(".") === -1 ||
      event.target.value.indexOf("email=") !== -1
    ) {
      //third test is preventing error in backend validation
      setEmailStatus(0);
    } else {
      setEmailStatus(1);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (
      event.target.value.indexOf("firstName=") !== -1 ||
      event.target.value === ""
    ) {
      setFirstNameStatus(0);
    } else {
      setFirstNameStatus(1);
    }
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (
      event.target.value.indexOf("lastName=") !== -1 ||
      event.target.value === ""
    ) {
      setLastNameStatus(0);
    } else {
      setLastNameStatus(1);
    }
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    if (
      event.target.value.indexOf("phone=") !== -1 ||
      event.target.value === ""
    ) {
      setPhoneStatus(0);
    } else {
      setPhoneStatus(1);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (
      event.target.value.indexOf("password=") !== -1 ||
      event.target.value === ""
    ) {
      setPasswordStatus(0);
    } else {
      setPasswordStatus(1);
    }
  };

  const handleBirthdayChange = (event) => {
    console.log(event.target.value);
    setBirthday(event.target.value);
	let bday = new Date(event.target.value);
	let todayDate = new Date();
	let timeDiff = Math.abs(todayDate.getTime() - bday.getTime());
	let diffyears = Math.ceil(timeDiff / (1000 * 3600 * 24)/365);
	setBirthdayStatus(diffyears > 18);
  };

  const handleStreetChange = (event) => {
    setStreetAddress(event.target.value);
    if (
      event.target.value.indexOf("streetAddress=") !== -1 ||
      event.target.value === ""
    ) {
      setStreetAddressStatus(0);
    } else {
      setStreetAddressStatus(1);
    }
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
    if (
      event.target.value.indexOf("city=") !== -1 ||
      event.target.value === ""
    ) {
      setCityStatus(0);
    } else {
      setCityStatus(1);
    }
  };
  const handleStateChange = (event) => {
    setState(event.target.value);
    if (
      event.target.value.indexOf("state=") !== -1 ||
      event.target.value === ""
    ) {
      setStateStatus(0);
    } else {
      setStateStatus(1);
    }
  };  const handleZipChange = (event) => {
    setZipCode(event.target.value);
    if (
      event.target.value.indexOf("zipCode=") !== -1 ||
      event.target.value === ""
    ) {
      setZipCodeStatus(0);
    } else {
      setZipCodeStatus(1);
    }
  };
  const handleReferralChange = (event) => {
    setReferral(event.target.value);

    if (event.target.value.indexOf("referral=") !== -1) {
      setReferralStatus(0);
    } else {
      setReferralStatus(1);
    }

    console.log(
      firstNameStatus,
	  lastNameStatus,
      phoneStatus,
      emailStatus,
      passwordStatus,
      birthdayStatus,
      referralStatus
    );
  };

  const toggleModal = () => {
    setModal(0);
  };

  const submitButtonPressed = (event) => {
    setModal(1);

    console.log("button pressed");
    event.preventDefault();
	let post = new Map();
	post['firstName'] = firstName;
	post['lastName'] = lastName;
	post['phone'] = phone;
	post['email'] = email;
	post['password'] = password;
	post['birthday'] = birthday;
	post['streetAddress'] = streetAddress;
	post['city'] = city;
	post['state'] = state;
	post['zipCode'] = zipCode;
	post['referral'] = referral;
	  const headers = {
		  "Content-Type": "application/json",
	  };
    axios
      .post("https://api.pontis.digital/waitlist", post, { headers })
      .then(function (response) {
        setModal(2);
        // REFERRAL GENERATED COMES HERE
		if(response.data.length == 6)
		{
			console.log("Response: " + response.data);
			setCode(response.data);
		}


        if (response.data === "PHONE_EXISTS") {
          setModalError(
            "You're already signed up for the waitlist using this phone number!"
          );
          setModal(3);
        } else if (response.data === "EMAIL_EXISTS") {
          setModalError(
            "You've already registered with this email.  Please try again."
          );
          setModal(3);
        } else if (response.data === "PHONE_INVALID") {
          setModalError(
            "Please enter a valid phone number"
          );
          setModal(3);
			

      }})
      .catch(function (error) {
        console.log(error.response.data);
        console.log(error.response);
        if (error.response.data === "PHONE_EXISTS") {
          setModalError(
            "You're already signed up for the waitlist using this phone number!"
          );
          setModal(3);
        } else if (error.response.data === "EMAIL_EXISTS") {
          setModalError(
            "You've already registered with this email.  Please try again."
          );
          setModal(3);
        } else if (error.response.data === "PHONE_INVALID") {
          setModalError(
            "Please enter a valid phone number"
          );
          setModal(3);
        } else {
          setModalError(
			  lang==='en'?
            "Something went wrong on our end and your request is unable to be processed. Please try again later."
			  :'Algo salió mal por nuestra parte y no se pudo procesar su solicitud. Por favor, inténtelo de nuevo más tarde.'
          );
          setModal(3);
        }
      });
  };

  return (
    <div className="waitlist" id="waitlist">
      {modal !== 0 && (
        <WaitlistModal
          status={modal}
          func={toggleModal}
          code={code}
          error={modalError}
        />
      )}
      <div className="container">
        <h1 className="waitlist-title">
			{lang==='en'?'Join now and get $5 for free' : 'Únase ahora y obtenga $5 gratis'}
		</h1>
        <h3 className="waitlist-subtitle">
			{lang==='en'?'Share your referral code and get $3 everytime a friend joins' : 'Comparta su código de referencia y obtenga $3 cada vez que un amigo se una'}
        </h3>
          <form
            className="waitlist-form"
            onSubmit={(e) => submitButtonPressed(e)}>
            <div className="waitlist-input-half-container">
				<div className="waitlist-input-half">
				  <p className="waitlist-input-text">
					  {lang==='en'?'Your First Name':'Su Nombre'}
				  </p>
				  {firstNameStatus === 0 && (
					<p className="waitlist-input-error">
						{lang==='en'?'There is an error with the name you entered.':'Hay un error con el nombre que ingresaste.'}
					</p>
				  )}
				  <input
					type="text"
					placeholder="John"
					onInput={handleFirstNameChange}
				  />
				</div>
				<div className="waitlist-input-half">
				  <p className="waitlist-input-text">
					  {lang==='en'?'Your Last Name':'Tu Apellido'}
				  </p>
				  {lastName === 0 && (
					<p className="waitlist-input-error">
						{lang==='en'?'There is an error with the name you entered.':'Hay un error con el apellido que ingresó.'}
					</p>
				  )}
				  <input
					type="text"
					placeholder="Doe"
					onInput={handleLastNameChange}
				  />
				</div>
			</div>
            <div className="waitlist-input-half-container">
				<div className="waitlist-input-half">
				  <p className="waitlist-input-text">
				  {lang==='en'?'Phone Number':'Número de Teléfono'}
				  </p>
				  {phoneStatus === 0 && (
					<p className="waitlist-input-error">
						{lang==='en'?'There is an error with the number you entered.':'Hay un error con el número que ingresaste.'}
					  
					</p>
				  )}
				  <input
					type="tel"
					placeholder="123-456-7890"
					onInput={handlePhoneChange}
				  />
              </div>
              <div className="waitlist-input-half">
                <p className="waitlist-input-text">
				  {lang==='en'?'Your Birthday':'Tu cumpleaños'}
				</p>
				{birthdayStatus === 0 && (
                <p className="waitlist-input-error">
                  There is an error with the password you entered.
                </p>
              )}
                <input
					type="date"
					placeholder="Enter birthday"
					onInput={handleBirthdayChange}
				/>
				</div>
				</div>
				<div className="waitlist-input">
				  <p className="waitlist-input-text">Email</p>
				  {emailStatus === 0 && (
					<p className="waitlist-input-error">
					{lang==='en'?'There is an error with the email you entered.':'Hay un error con el correo electrónico que ingresaste.'}
					</p>
				  )}
				  <input
					type="email"
					placeholder="johndoe@gmail.com"
					onInput={handleEmailChange}
				  />
				</div>
            <div className="waitlist-input">
              <p className="waitlist-input-text">
				  {lang==='en'?'Password':'Clave'}
			  </p>
              {passwordStatus === 0 && (
                <p className="waitlist-input-error">
					{lang==='en'?'There is an error with the password you entered.':'Hay un error con la contraseña que ingresaste.'}
                </p>
              )}
              <input
                type="password"
				  placeholder={lang==='en'?'Password':'Contraseña'}
                onInput={handlePasswordChange}
              />
            </div>
            <div className="waitlist-input-half-container">
            </div>
            <div className="waitlist-input">
              <p className="waitlist-input-text">
				  {lang==='en'?'Street Address':'Dirección'}
			  </p>
              {streetAddressStatus === 0 && (
                <p className="waitlist-input-error">
                  There is an error with the address you entered.
                </p>
              )}
              <input
                type="text"
                placeholder="Av. Madre Rivera"
                onInput={handleStreetChange}
              />
            </div>
            <div className="waitlist-input-half-container">
				<div className="waitlist-input-third">
				  <p className="waitlist-input-text">
				  {lang==='en'?'City':'Ciudad'}
				  </p>
              {cityStatus === 0 && (
                <p className="waitlist-input-error">
					Required
                </p>
              )}
				  <input
					type="text"
					placeholder="Humacao"
					onInput={handleCityChange}
				  />
				</div>
				<div className="waitlist-input-third">
				  <p className="waitlist-input-text">
					  {lang==='en'?'State':'Estado'}
				  </p>
              {stateStatus === 0 && (
                <p className="waitlist-input-error">
					Required
                </p>
              )}
				  <input
					type="text"
					placeholder="PR"
					onInput={handleStateChange}
				  />
				</div>
				<div className="waitlist-input-third">
				  <p className="waitlist-input-text">
					  {lang==='en'?'Zip Code':'Código Postal'}
				  </p>
              {zipCodeStatus === 0 && (
                <p className="waitlist-input-error">
					Required
                </p>
              )}
				  <input
					type="number"
					placeholder="00791"
					onInput={handleZipChange}
				  />
				</div>
			</div>
            <div className="waitlist-input">
              <p className="waitlist-input-text">
				  {lang==='en'?'Referral Code (optional)':'Código de Referencia (Opcional)'}
			  </p>
              <input
                type="text"
                placeholder="AB1234"
                onInput={handleReferralChange}
                value={props.refCode}
              />
            </div>
            <input
              type="submit"
				value={lang==='en'?'Sign Up':'Inscribirse'}
            />
          </form>
      </div>
    </div>
  );
}

export default Waitlist
