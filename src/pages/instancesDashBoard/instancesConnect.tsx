import { useEffect, useRef, useState } from "react"
import ComponentCard from "../../components/common/ComponentCard"
import { useGlobalData } from "../../globalVar/globalVar"
import QRCodeComponent from "./Qr"




export default function InstancesConnection({show,setAction,instanceConfig,action}:{show:boolean,setAction:(action:number)=>void,instanceConfig:string,action:number}){
    return(
        <div className={`${!show?'hidden':''}`}>
            <InstancesConnectionForm instanceConfig={instanceConfig} setAction={setAction} action={action}></InstancesConnectionForm>
            <button onClick={()=>{setAction(1)}} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Go back </button>
        </div>
    )
}

function InstancesConnectionForm({instanceConfig,setAction,action}:{instanceConfig:any,setAction:(n:number)=>void,action:number}){
    const {userToken}=useGlobalData();
    const inter=useRef<ReturnType<typeof setInterval> | null>(null);
    const [status,setStatus]=useState<string>('init')
    const [qr,setQr]=useState<string>('');
    const [idFetch,setIdFetch]=useState('');
    const url=import.meta.env.VITE_IS_PRODUCTION!='FALSE'?'':import.meta.env.VITE_URL_TEST;

    async function checkInstance(){
        try {
          const data=await fetch(url+'/api/instance/get', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({instanceId:instanceConfig})
          }).then(response => response.json());
          const {data:instanceDatav}=data;
          const {instances:instancesData}=instanceDatav;
          const newValue=instancesData[0]; 
          if(!newValue){throw new Error("Sin instancia");}
          console.log(newValue.session)
          setStatus(newValue.session);
          if(newValue.session=='close'){reStart();}
          if(newValue.session=='connected'){
            console.log("CONECTÓ !!!")
            reStart();
            setAction(100)
          }
        } catch (error) {
          console.log("there is an error",error)
        }
        
    }

    //Al iniciar
    const reStart=()=>{
        if(instanceConfig==''){return}
        //Si estamos en esta pantall
        if (inter.current) clearInterval(inter.current);
        setStatus('init');
        setQr('');
        setIdFetch('');
    }
    useEffect(reStart,[action]);

    //Cuando se asigna una instanceConfig (en el listado) y cuando llegan los primeros datos
    useEffect(()=>{
        if(instanceConfig=='' || idFetch==''){return} 
        inter.current = setInterval(() => {
            console.log("chequeando")
            checkInstance();
        }, 1000);
        return ()=>{
            if (inter.current) clearInterval(inter.current);
        }
        
    },[instanceConfig,idFetch])

 
    
    async function initInstance(){
        try {
         setStatus('qr')
         setQr('')
         const data=await fetch(url+'/api/instance/init', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({instanceId:instanceConfig})
          }).then(response => response.json());
            const {data:instanceDataV}={...data}
            const {instance: instanceData}=instanceDataV
            console.log(instanceData,"INICIOOO")
            //Inicializo para mostrar el QR
            setStatus('qr')
            //Fijo en Cero QR para que ponga loading
            setQr(instanceData.qr);
            console.log("Le dimos valor al QR")
            //Si está el QR Seteo IdFetch
            setIdFetch(instanceData.id)
            
        } catch (error) {
           //Si hay un error en la solicitud se restartea para que quede de cero
           alert('An error has happend, try again')
           reStart()
        }
      }
    
    

    return(
        <div className="text-black dark:text-white">
            <ComponentCard title="Connect your instance with Whatsapp">
              <div className="w-full flex flex-col md:flex-row">
                <div className="w-full px-3 md:hidden mb-10">
                    <p className="mb-2">1- Open your whatsapp or whatsapp bussiness in your phone.</p>
                    <p className="mb-2">2- Open linked devices.</p>
                    <p className="mb-2">3- Scan the following QR code.</p>
                    <div className={`${status=='qr'?'':'hidden'}`}>
                    <div className={`${qr!=''?'':'hidden'}`}><QRCodeComponent text={qr || ''} /></div>
                    <div className={`${qr!=''?'hidden':''}`}>
                        <div style={{width: "150px",height:"150px",textAlign:'center'}}>
                            <div className="lds-hourglass"></div>
                              <p style={{marginTop:'-30px'}}>Loading QR</p>
                            </div>
                    </div>
                    </div>
                    <div className={`${(status=='connected' || status=='connecting')?'':'hidden'}`}>
                        <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
                        <p style={{marginTop:'-30px'}}>Connecting</p>
                        </div>
                    </div>
                    <div className={`${(status=='close' || status=='init')?'':'hidden'}`}>
                        <button onClick={initInstance} className="mt-0 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Get your QR clicking here </button>
                    </div>
                </div>
                <div className="w-full md:w-1/4">
                  <img src="images/template/wspconnect.gif" className="w-100 rounded-[30px]" style={{border:'4px solid #000'}}></img>
                </div>
                <div className="w-full md:w-3/4 px-3 hidden md:block">
                    <p className="mb-2">1- Open your whatsapp or whatsapp bussiness in your phone.</p>
                    <p className="mb-2">2- Open linked devices.</p>
                    <p className="mb-2">3- Scan the following QR code.</p>
                    <div className={`${status=='qr'?'':'hidden'}`}>
                    <div className={`${qr!=''?'':'hidden'}`}><QRCodeComponent text={qr || ''} /></div>
                    <div className={`${qr!=''?'hidden':''}`}>
                        <div style={{width: "150px",height:"150px",textAlign:'center'}}>
                            <div className="lds-hourglass"></div>
                              <p style={{marginTop:'-30px'}}>Loading QR</p>
                            </div>
                    </div>
                    </div>
                    <div className={`${(status=='connected' || status=='connecting')?'':'hidden'}`}>
                        <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
                        <p style={{marginTop:'-30px'}}>Connecting</p>
                        </div>
                    </div>
                    <div className={`${(status=='close' || status=='init')?'':'hidden'}`}>
                        <button onClick={initInstance} className="mt-0 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Get your QR clicking here </button>
                    </div>
                </div>
              </div>
            </ComponentCard>
            
        </div>
    )
}