
import Input from "../form/input/InputField";
import { useEffect, useState } from "react";
import { Modal } from '../ui/modal/index';
import { useGlobalData } from "../../globalVar/globalVar";

export default function UserMetaCard() {
  const params = new URLSearchParams(window.location.search);
  const typeAction = params.get('action'); // puede ser 'password', null, etc.// ✅ 'password' o null
  const {user,userToken,setUserToken}=useGlobalData()
  const [editPassword,seteditPassword]=useState(false);
  const [isMandatory,setIsMandatory]=useState(false)
  const [oldPass,setOldPass]=useState('')
  const [newPass,setNewPass]=useState('')
  const [newPass2,setNewPass2]=useState('');
  const [section, setSection] = useState(1);
  const [messageError, setMessageError] = useState("");
  const url=import.meta.env.VITE_IS_PRODUCTION!='FALSE'?import.meta.env.VITE_URL_PRODUCTION:import.meta.env.VITE_URL_TEST;

  useEffect(()=>{
    if(typeAction=='password'){
      const url = new URL(window.location.href);
      url.searchParams.delete('action');
      window.history.replaceState({}, '', url);
      seteditPassword(true)
      setIsMandatory(true)
    }
  },[typeAction])

  async function changePassword(){
      setSection(0)
      try {
        const dataUser = await fetch(url+'/login/users/setpassword', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({password:oldPass,newPassword:newPass})
        }).then(response => response.json());
        console.log(dataUser)
        if(dataUser.error){throw new Error(dataUser.message)}
        setIsMandatory(true)
        setSection(2); 
      } catch (error) {
        const err = error as Error;
        setMessageError(err?.message)
        setTimeout(()=>{setMessageError('')},3000)
        setSection(1)
      } 
  }

  function openModal(){
    setSection(1);
    setMessageError('');
    setNewPass('');
    setNewPass2('');
    setOldPass('');
    seteditPassword(!editPassword);
  }

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src="/app/images/user/base.png" alt="user" />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left hidden">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Team Manager
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Arizona, United States
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              onClick={()=>{openModal();}}
              className="flex mt-1 w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <img src="images/icons/key.svg" style={{width:"18px"}} className="invert-[0.4] dark:invert-[0.6]"/>
              Password
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={editPassword} onClose={()=>{isMandatory?false:seteditPassword(false);}} className="dark:text-white" showCloseButton={!isMandatory}>
            <div className="h-[10vh] p-5">
              <h1 className="text-[1.6em]">Change Password</h1>
            </div>
            <div className={`p-5 ${section==2?'':'hidden'}`}>
              <h1>Se modificó correctamente</h1>
            </div>
            <div className={`p-5 ${section==1?'':'hidden'}`}>
            <div className={`py-5 ${!isMandatory?'hidden':''}`}>
            <p>You must define a new password for your account</p>
            </div>
            <div className={`${isMandatory?'hidden':''}`}>
              Old Password: <Input type="password" value={oldPass} onChange={(e)=>{setOldPass(e.target.value)}}></Input><br /></div>
            New Password: <Input type="password" value={newPass}  onChange={(e)=>{setNewPass(e.target.value)}}></Input><br />
            Repeat Password: <Input type="password" value={newPass2} onChange={(e)=>{setNewPass2(e.target.value)}}></Input><br />
            <p className={`${oldPass.length>0 && oldPass.length<6?'':'hidden'}`}>Old Pasword must have at least 6 characters.</p>
            <p className={`${newPass.length>0 && newPass.length<6?'':'hidden'}`}>New Pasword must have at least 6 characters.</p>
            <p className={`${newPass!=newPass2 && newPass2.length>0?'':'hidden'}`}>New Passwords must be same.</p>
            <p className="text-red-600">{messageError}</p>
            </div>
            <div className={`p-5 ${section==0?'':'hidden'}`}>
              <center>
              <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
              <p style={{marginTop:'-30px'}} className="dark:text-white/90">Sending data</p>
              </div>
              </center>
            </div>
            <div className="h-[8vh] py-2 px-10">
              <div className={`${section==1?'':'hidden'}`}>
                <a className={`cursor-pointer float-right`} onClick={()=>{changePassword();}}>Change</a>
              </div>
              <div className={`${section==2?'':'hidden'}`}>
                <a className={`cursor-pointer float-right`} onClick={()=>{setUserToken('1');}}>Sign in again</a>
              </div>
            </div>
      </Modal>
    </>
  );
}
