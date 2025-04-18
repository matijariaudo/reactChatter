import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [section, setSection] = useState(1);
  const [sectionModal, setSectionModal] = useState(1);
  const [inputEmail,setInputEmail] = useState('')
  const [inputClave,setInputClave] = useState('')
  const [editPassword,seteditPassword]=useState(false);
  const [messageError, setMessageError] = useState("");
  const [newPassEmail,setNewPassEmail]=useState('')
  const url=import.meta.env.VITE_IS_PRODUCTION!='FALSE'?'':import.meta.env.VITE_URL_TEST;
  

  const loginForm=async()=>{
    try {
      setSection(0)
      const dataSent={email:inputEmail,password:inputClave};
      console.log(url+'/login/users/login',url,import.meta.env.VITE_IS_PRODUCTION,import.meta.env.VITE_URL_PRODUCTION,import.meta.env.VITE_URL_TEST)
      const dataUser = await fetch(url+'/login/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataSent)
      }).then(response => response.json());
      console.log(dataUser)
      if(dataUser.error){throw new Error(dataUser.error)}
      console.log(dataUser.data.token)
      localStorage.setItem("token",dataUser.data.token)
      setTimeout(()=>{
        navigate('/app/instances')
      },1000) 
      return;
    } catch (error) {
      const err = error as Error;
      alert(err.message);
      setSection(1);
    }
  }

  const sendEmail=async()=>{
    try {
      setSectionModal(0)
      const dataSent={email:newPassEmail};
      const dataUser = await fetch(url+'/login/users/sendpassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataSent)
      }).then(response => response.json());
      console.log(dataUser)
      if(dataUser.error){throw new Error(dataUser.error)}
      setSectionModal(2)
      return;
    } catch (error:any) {
      const err = error as Error;
      setMessageError(err.message)
      setSectionModal(1)
    }
  }

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col  flex-1 w-full max-w-md mx-auto">
        
        <div style={{display:section==1?'block':'none'}} >
          <div className="mb-5 sm:mb-8 mt-10">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              <img src="images/logo/logo.png" className="flex dark:hidden"/>
              <img src="images/logo/logo-dark.png" className="hidden dark:flex"/>
            </h1>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 sm:gap-5">
              <button onClick={()=>{location.href="/login/logingoogle"}} className="inline-flex items-center w-full justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button>
              <button  className=" items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 hidden">
                <svg
                  width="21"
                  className="fill-current"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
                </svg>
                Sign in with X
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-[#FDFDFE] dark:bg-[#101828] sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)} placeholder="info@gmail.com"/>
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input value={inputClave}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e)=>setInputClave(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <a
                    onClick={()=>{seteditPassword(true)}}
                    className="text-sm text-emerald-600 hover:text-emerald-600 dark:text-emerald-400 cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
                <div>
                  <Button className="w-full" size="sm" onClick={loginForm}>
                    Sign in
                  </Button>
                </div>
              </div>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/app/signup"
                  className="text-sm text-emerald-600 hover:text-emerald-600 dark:text-emerald-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div style={{display:section==0?'block':'none'}} className="text-black dark:text-white mt-[20vh]">
          <center>
          <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
          <p style={{marginTop:'-30px'}}>Loading Data</p>
          </div>
          </center>
        </div>
      </div>
      <Modal isOpen={editPassword} onClose={()=>{seteditPassword(false);}} className="dark:text-white" >
            <div className="h-[10vh] p-5">
              <h1 className="text-[1.6em]">Reset your password</h1>
            </div>
            <div className={`p-5 ${sectionModal==2?'':'hidden'}`}>
              <p className="py-5">We've sent an email to your account. <br />
                <a className="text-yellow-400">Don't forget to check your spam folder.</a></p>
            </div>
            <div className={`p-5 ${sectionModal==1?'':'hidden'}`}>
              <p className="py-5">Enter your email, we will send you an email with temporary access</p>
              <Input type="text" placeholder="Input your email here" value={newPassEmail} onChange={(e)=>{setNewPassEmail(e.target.value)}}></Input><br />
              <p className="text-red-600">{messageError}</p>
            </div>
            <div className={`p-5 ${sectionModal==0?'':'hidden'}`}>
              <center>
              <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
              <p style={{marginTop:'-30px'}} className="dark:text-white/90">Sending email</p>
              </div>
              </center>
            </div>
            <div className="h-[8vh] py-2 px-10">
            <div className={`${sectionModal==1?'':'hidden'}`}>
                <a className={`cursor-pointer float-right`} onClick={()=>{sendEmail();}}>Send email</a>
              </div>
              <div className={`${sectionModal==2?'':'hidden'}`}>
                <a className={`cursor-pointer float-right`} onClick={()=>{setSectionModal(1);seteditPassword(false);}}>Okay</a>
              </div>
            </div>
      </Modal>
    </div>
  );
}
