import GridShape from "../../components/common/GridShape";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import {  MailIcon } from "../../icons";
import { useState } from "react";
import { useGlobalData } from "../../globalVar/globalVar";

export default function CheckEmail() {
  const [available, setAvailable] = useState(true);
  const [section, setSection] = useState(1);
  const {user,userToken}=useGlobalData();
  const url=import.meta.env.VITE_IS_PRODUCTION!='FALSE'?'':import.meta.env.VITE_URL_TEST;

  const setNewPassword=async()=>{
    setSection(0)
    try {
      const dataUser = await fetch(url+'/login/users/sendvalidation', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }).then(response => response.json());
      if(dataUser.error){throw new Error(dataUser.error)}
      setSection(1);
      setAvailable(false);
      setTimeout(()=>{setAvailable(true)},25000)
    } catch (error) {
      alert('We had trouble sending you the validation email. Please try again.')
      setSection(1)
    }
  }
  return (
    <>
      <PageMeta
        title="React.js 404 Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js 404 Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <GridShape />
        <div className="mx-auto w-full max-w-[242px] text-center  sm:max-w-[472px]">
          <h1 className="mb-8 inline-flex font-bold text-gray-800 text-center text-title-md dark:text-white/90 xl:text-title-2xl">
            <MailIcon className="mr-2 mt-1"></MailIcon> Validate your email
          </h1>
          <p className="dark:text-white/90 mb-5">Your email is not verified. Before you can take any action, we first need to validate your email.
          <br />
          <br />
          Do you want to receive an email again?  We can send an email to {user?.email}.</p>
          <p className="text-yellow-400 mb-5">Please don't forget to check spam box.</p>
          <div style={{display:section==1?'block':'none'}}>
            <div className={`${available?'':'hidden'}`}>
            <Button className={`w-full`} size="sm" onClick={()=>{setNewPassword()}}>
              Send new email confirmation
            </Button>
            </div>
            <p className={`w-full ${available?'hidden':''}`}>We've sent you an email, you can send a new one in 30 seconds.</p>
          </div>
          <div style={{display:section==0?'block':'none'}} className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
            <center>
            <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
            <p style={{marginTop:'-30px'}} className="dark:text-white/90">Sending new email</p>
            </div>
            </center>
          </div>
        </div>
        
        
        {/* <!-- Footer --> */}
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
          &copy; {new Date().getFullYear()} - Chatter +
        </p>
      </div>
    </>
  );
}
