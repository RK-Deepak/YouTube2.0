import React, {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ytLogo from "../assets/yt-logo.png";
import ytLogoMobile from "../assets/yt-logo-mobile.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import useApp from "../context/AppContext";
import Loader from "../loader/loader";
import { MdAccountCircle, MdMic } from "react-icons/md";
import { recoginsation } from "../utils/voice";
import {
  setPersistence,
 
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = ({ setIsListening }) => {
  const [searchVisible, setsearchVisible] = useState(false);
 
  const [photouser, setphotouser] = useState(null);
  const {
    loading,
    mobilemenu,
    setmobilemenu,
    setselectedcategory,
    searchquery,
    setsearchquery,
    setisfocused,
    isfocused
  } = useApp();
  const [suggestion, setsuggestion] = useState(null);
  const navigate = useNavigate();

  //sign in  firebasee

  const handleSignInandOut = () => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        if (localStorage.getItem("userdata") === "nodata") {
          const provider = new GoogleAuthProvider();

          return signInWithPopup(auth, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              const user = result.user;
             
              localStorage.setItem("userdata", user?.photoURL);
        
              setphotouser(user?.photoURL);
              return { user, token };
            })
            .catch((error) => {
              console.error("Sign-in Error:", error);
              throw error;
            });
        } else {
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              localStorage.setItem("userdata", "nodata");
              setphotouser(null);
            })
            .catch((error) => {
              // An error happened.
            });
        }
      })
      .catch((error) => {
        console.error("Persistence Error:", error);
        throw error;
      });
  };

  //search suggestion
  const handleSearchQuery = (e, searchsuggesttext) => {
    e.preventDefault();
   
    if (searchquery.trim().length > 0) {
     
      setisfocused(false);
      if (searchsuggesttext !== "") {
      
        setselectedcategory(searchsuggesttext);
        setsearchquery(searchsuggesttext);
        navigate(`/search/${searchsuggesttext}`);
      } else {
        setselectedcategory(searchquery);
        setsearchquery(searchsuggesttext);
        navigate(`/search/${searchquery}`);
      }
    }
  };

  const mobilemenuToggle = () => {
    setmobilemenu(!mobilemenu);
  };

  useEffect(() => {
    let timerId;
  
    if (timerId) {
      clearInterval(timerId);
    }
    
    timerId = setTimeout(() => {
      async function fetchSuggestions() {
        if (searchquery !== "") {
          const callbackName = 'jsonpCallback';
  
          // Construct the JSONP URL
          const apiUrl = `https://suggestqueries.google.com/complete/search?client=firefox&q=${searchquery}&callback=${callbackName}`;
  
          // Define the JSONP callback function
          window[callbackName] = function(data) {
            const suggestions = data[1];
            setsuggestion(suggestions);
            delete window[callbackName]; // Clean up callback function
          };
  
          // Create a script element
          const script = document.createElement('script');
          script.src = apiUrl;
  
          // Append the script element to the document body
          document.body.appendChild(script);
        } else {
          setsuggestion(null);
        }
      }
  
      fetchSuggestions();
    }, 300);
  
    return () => clearInterval(timerId);
  }, [searchquery]);
  

  function handleSuggestion(e) {
    setsearchquery(e.target.textContent);
    setisfocused(false);
    handleSearchQuery(e, e.target.textContent);
  }
  //voice search

  const handleVoiceRecognisation = () => {
    setIsListening(true);
    recoginsation.start();

    recoginsation.onresult = (e) => {
      console.log(e);
      const result = e.results[0][0].transcript;

      if (result !== null || result !== "" || result !== " ") {
        setsearchquery(result);

        handleSearchQuery(e, result);
        setIsListening(false);
      }
    };
  };

  return (
    <div className="sticky top-0 z-30 w-full bg-black px-4 py-3 h-13 flex items-center justify-between gap-2 ">
      {loading && <Loader />}
      <div className={`flex gap-3   ${searchVisible ? "w-0" : "w-[20%]"}`}>
        <SlMenu className="text-xl text-white " onClick={mobilemenuToggle} />
        <Link to="/" className="h-5 ">
          <img src={ytLogo} className="hidden md:block h-[100%]" />
          <img src={ytLogoMobile} className="block md:hidden h-[100%]" />
        </Link>
      </div>
      <div className={` w-[100%] sm:w-[60%] flex gap-2  items-center relative`}>
        <div className={`items-center gap-2 flex w-full rounded-full } `}>
          <form onSubmit={handleSearchQuery} className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full px-3 py-[3px] rounded-full sm:block ${
                searchVisible ? "block " : "hidden"
              }`}
              value={searchquery}
              onChange={(e) => setsearchquery(e.target.value)}
              onFocus={() => setisfocused(true)}
            ></input>
            <div
              className="text-white absolute right-[0px] -top-[1px] rounded-full bg-black rouded-full p-[6px] text-xl hidden sm:block "
              onClick={handleSearchQuery}
            >
              <IoIosSearch />
            </div>
            <div
              className={`text-white absolute right-[0px] ${
                searchVisible ? "-top-[1px] -right-[2px]" : "-top-[13px]"
              } rounded-full bg-black rouded-full p-[6px] text-xl block sm:hidden`}
            >
              <IoIosSearch
                onClick={() => {
                  setsearchVisible(!searchVisible);
                  handleSearchQuery;
                }}
              />
            </div>
            {suggestion !== null && isfocused && (
              <div className="flex flex-col absolute bg-white text-black gap-[10px] w-[94%] top-[35px] p-[10px] rounded-[10px] left-[10px] border border-slate-400">
                {suggestion?.map((eachsuggestion, index) => (
                  <p
                    className=" capitalize font-bold text-slate-400 hover:bg-slate-800 px-2 py-1 rounded-md"
                    key={index}
                    onClick={handleSuggestion}
                  >
                    {eachsuggestion}
                  </p>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="p-2 rounded-full bg-white self-end">
          <MdMic className="text-black " onClick={handleVoiceRecognisation} />
        </div>
        <div>
          {localStorage.getItem("userdata") !== "nodata" ||
          photouser !== null ? (
            <img
              src={localStorage.getItem("userdata") || photouser}
              className=" w-10 rounded-full  self-end "
              onClick={handleSignInandOut}
            />
          ) : (
            <MdAccountCircle
              className="text-white text-4xl self-end "
              onClick={handleSignInandOut}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
