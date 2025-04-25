import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {  PencilIcon, TrashBinIcon } from "../../icons";
import { useGlobalData } from "../../globalVar/globalVar";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../components/ui/modal";
import Input from "../../components/form/input/InputField";
import Badge from "../../components/ui/badge/Badge";


export default function InstancesList({show,setAction,setInstanceConfig,setInstanceDataId,action}:{show:boolean,setAction:(action:number)=>void,instanceConfig:string,setInstanceDataId:(instanceConfig:string)=>void,setInstanceConfig:(instanceConfig:string)=>void,action:number}) {
  const {instances,instancesFunction}=useGlobalData();
  const {fetchInstances}=instancesFunction;
  const [instanceDelete,setInstanceDelete]=useState<string>("")
  const [open,setOpen]=useState<boolean>(false)
  const [buttonConnected,setButtonConnected]=useState<boolean>(false)

  async function checkInstance(id:string){
      setInstanceConfig(id)
      setAction(3);
  }


  

  const instancesShowArray=useMemo(()=>{
    if(instances){if(action!=3){setAction(1)}}
    if(!instances){return [];}
    const newInstances=[...instances]
    return newInstances.filter(a=>{
      return buttonConnected?a.session=='connected':true
    });
  },[instances,buttonConnected])

  useEffect(()=>{
    if(instances){if(action!=3){setAction(1)}}
  },[instancesShowArray])

  const handleCopy = (text:string) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log("Copiado!");
          alert('The token has been copied.')
        })
        .catch(err => {
          console.error("Error al copiar", err);
        });
    } else {
      console.warn("Clipboard API no disponible");
    };
  };

  return (
    <div  className={`overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 ${!show?'hidden':''}`}>
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            YOUR INSTANCES
          </h3>
          <p className="text-gray-500 hidden">
            <input style={{marginTop:'-12px'}} type="checkbox" checked={buttonConnected} onChange={()=>{setButtonConnected(!buttonConnected)}}/> Show Connected instances
          </p>
        </div>
        <div className={`${instancesShowArray.length==0?'hidden':''} flex items-center gap-3`}>
          <div className="hidden">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
          </div>
          <button onClick={()=>{setAction(2)}} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Create new <img src="images/icons/whatsapp.png" className="w-[19px] invert-[0.3] dark:invert-[0.7]"/>
          </button>
          <div>
                <button onClick={()=>{setAction(100)}} className="mt-0 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">Refresh</button>
          </div>
        </div>  
      </div>
      <div>
      <p className="text-m my-2 text-gray-500 dark:text-white/50">Each instance is a connection to a WhatsApp account. After creating it, you'll get a QR code to link the instance with your WhatsApp.</p>
          
      </div>
      <div className="max-w-full overflow-x-auto hidden md:flex">
        <Table className={`${instancesShowArray.length==0?'hidden':''}`}>
          {/* Table Header */}
          <TableHeader className={`border-gray-100 dark:border-gray-800 border-y `}>
            <TableRow>
            <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name 
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                InstanceId 
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Type
              </TableCell>
              <TableCell
                isHeader
                className="text-center py-3 font-medium text-gray-500 text-center text-theme-xs  dark:text-gray-400"
              >
                Connection
              </TableCell>
              
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center md:text-start text-theme-xs dark:text-gray-400"
              >
                Connect
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-center md:text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {instancesShowArray.map((instance:any,i:number) => (
              <TableRow key={instance.instanceId} className="">
                
                <TableCell className="py-3 items-center gap-3 text-gray-700 dark:text-white/80 cursor-pointer">
                   <a onClick={()=>{if(instance.session==='connected'){setInstanceDataId(instance.instanceId);}}}>{instance.name}</a>
                </TableCell>
                <TableCell className="py-3 flex items-center gap-3 text-gray-700 dark:text-white/80">
                    {instance.instanceId.slice(0,10)}...
                    <button onClick={()=>{handleCopy(instance.instanceId)}} 
                    className="inline-flex items-center gap-2 text-[.6em] rounded-lg border border-gray-300 bg-white px-3 py-.5 ml-0 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                    Copy
                    </button>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                {instance.type}
                </TableCell>
                <TableCell className={`py-3 text-${instance.session=='connected'?'emerald-400':'gray-500'} text-theme-sm text-center dark:text-${instance.session=='connected'?'emerald-400':'gray-400'}`}>
                <Badge
                    size="sm"
                    color={
                      instance.session === "connected"
                        ? "success"
                        : instance.session === "close"
                        ? "error"
                        : "error"
                    }
                  >
                    {instance.session!='connected'?'Disconnected':'Connected'}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button onClick={()=>{checkInstance(instance.instanceId)}} 
                  className={`items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 pt-[5px] pb-[4px] ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 ${instance.session=='connected'?'hidden':'inline-flex'}`}> 
                  Connect <img src="images/icons/whatsapp.png" className="w-[15px] dark:invert-[0.7]"/>
                  </button>
                  </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button onClick={()=>{setOpen(true);setInstanceDelete(instance.instanceId)}} 
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 pt-[5px] pb-[8px] ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                  <TrashBinIcon/>
                  </button>
                  <button onClick={()=>{setInstanceConfig(instance.instanceId);setAction(2);}} 
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 pt-[5px] pb-[8px] ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                  <PencilIcon/>
                  </button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          </Table>
          
      </div>
      <div className="max-w-full md:hidden">
          {instancesShowArray.map((instance:any,i:number) => (
                <div key={i} className="border-1 text-black dark:text-white p-2 mb-2 rounded-xl border-[#d9d9d9] dark:border-[#49484a]">
                <div className="float-right m-1">
                <Badge
                    size="sm"
                    color={
                      instance.session === "connected"
                        ? "success"
                        : instance.session === "close"
                        ? "error"
                        : "error"
                    }
                
                  >
                    {instance.session!='connected'?'Disconnected':'Connected'}
                </Badge>
                </div>
                <a className="text-xs">{instance.type}</a>
                  <h3><a onClick={()=>{if(instance.session==='connected'){setInstanceDataId(instance.instanceId);}}}>{instance.name}</a></h3>
                  <div className="mb-1 flex text-xs">
                    InstanceId: {instance.instanceId.slice(0,30)}...
                    <button onClick={()=>{handleCopy(instance.instanceId)}} 
                    className="inline-flex items-center gap-2 text-[.6em] rounded-lg border border-gray-300 bg-white px-3 py-.5 ml-0 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                    Copy
                    </button>
                  </div>
                  <button onClick={()=>{setOpen(true);setInstanceDelete(instance.instanceId)}} 
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 pt-[5px] pb-[8px] ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                  <TrashBinIcon/>
                  </button>
                  <button onClick={()=>{setInstanceConfig(instance.instanceId);setAction(2);}} 
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 pt-[5px] pb-[8px] ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                  <PencilIcon/>
                  </button>
                  <button onClick={()=>{checkInstance(instance.instanceId)}} 
                  className={`items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 pt-[5px] pb-[4px] ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 ${instance.session=='connected'?'hidden':'inline-flex'}`}> 
                  Connect <img src="images/icons/whatsapp.png" className="w-[15px] dark:invert-[0.7]"/>
                  </button>
                  </div>
            ))}
      </div>
      <ModalEliminar open={open} setOpen={setOpen} setAction={setAction} instanceDelete={instanceDelete}></ModalEliminar>
      {instancesShowArray.length==0?<div className="text-gray-300" style={{width:'100%',textAlign:'center',padding:'10px'}}>
            <p>There aren't instances yet </p>
            <button onClick={()=>{setAction(2)}} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              Create new instance 
            </button>
            <br />
          </div>:''}
    </div>
  );
}


function ModalEliminar({open,setOpen,instanceDelete,setAction}:{open:boolean,setOpen:(v:boolean)=>void,instanceDelete:string,setAction:(n:number)=>void}){
  const {instancesFunction}=useGlobalData();
  const [messageError,setMessageError]=useState('')
  const {deleteInstances}=instancesFunction;
  const [sum,setSum]=useState('')
  
  useEffect(()=>{
    setSum('')
  },[open])

  async function removeInstance(){
      const wasDeleted=await deleteInstances(instanceDelete);
      if(wasDeleted){
        setOpen(!open);
        setAction(100)
      }else{
        setMessageError('It was not possible to remove. Please try again.')
        setTimeout(()=>{
          setMessageError('')
        },3000)
      }
  }
  
  return(
      <Modal isOpen={open} onClose={() => setOpen(!open)} className="text-black dark:text-white mt-[-20vh]">
        <div className="p-6" style={{minHeight:'10vh'}}>
        <h2 className="text-lg font-bold">Remove Instance</h2>
        </div>
        <div className="p-6" style={{minHeight:'15vh',marginTop:'0px'}}>
        <p className="">Do you want to remove this instance?</p>
        <div className="mt-10 flex">4+3 ?
          <div style={{width:'30%',marginLeft:'10px',marginTop:'-10px'}}><Input type="text" value={sum} placeholder="Enter your answer" onChange={(e)=>setSum(e.target.value)}></Input></div>
        </div>
        <div className="h-[30px]">
        <p className="text-rose-600 dark:text-rose-400">{messageError}</p>
        </div>
        </div>
        <div className="p-4 text-right" style={{minHeight:'10vh'}}>
        <button onClick={() => removeInstance()} className={`mt-4 px-4 py-2 text-black dark:text-white rounded-lg ${sum==='7'?'':'hidden'}`}>
            Yes, remove now!
          </button>
        </div>
      </Modal>
  )
}