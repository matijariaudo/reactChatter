import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {  TrashBinIcon } from "../../icons";
import { Token, useGlobalData } from "../../globalVar/globalVar";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "../../components/ui/modal";
import Badge from "../../components/ui/badge/Badge";


export default function ApikeyList({show,setActionToken,actionToken}:{show:boolean,setActionToken:(action:number)=>void,actionToken:number}) {
  const {tokens,tokensData,tokensFunction}=useGlobalData();
  const [tokenChange,setTokenChange]=useState<{token:string,status?:'active'|'paused'| 'deleted'}>({token:''})
  const [openModal,setOpenModal]=useState<boolean>(false)
  

  useEffect(()=>{
    if(actionToken==100){
      setActionToken(0)
      tokensFunction.fetchTokens()
    }
  },[actionToken])

  
  

  const tokensShowArray=useMemo(()=>{
    if(!tokensData){return [];}
    const newInstances=[...tokensData];
    return newInstances;
  },[tokensData])

  useEffect(()=>{
    if(!tokensData){return;}
    setActionToken(1);
  },[tokensData])

  useEffect(()=>{
    if(tokensShowArray.length>0){setActionToken(1);}
  },[tokensShowArray])

  
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

  async function editToken(tokenId:string,value:'deleted'|'paused'|'active'){
    const action:boolean=await tokensFunction.editTokens(tokenId,value);
    setOpenModal(false)
    if(action){
      setActionToken(100);
    }else{
      alert('An error has occurred, please try again.')
    }
  }

  return (
    <div  className={`overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 ${!show?'hidden':''}`}>
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            YOUR API KEYS
          </h3>
        </div>
        <div className={`${tokensShowArray.length==0?'hidden':''} flex items-center gap-3`}>
          <div className="hidden">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
          </div>
          <button onClick={()=>{setActionToken(2)}} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Create new <img src="images/icons/key.svg" style={{width:"18px"}} className="invert-[0.4] dark:invert-[0.6]"/>
          </button>
          <div>
                <button onClick={()=>{setActionToken(100)}} className="mt-0 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">Refresh</button>
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table className={`${tokensShowArray.length==0?'hidden':''}`}>
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
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Token
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tokensShowArray.map((token:Token,i:number) => (
              <TableRow key={token._id} className="">
                
                <TableCell className="py-3 flex items-center gap-3 text-gray-700  dark:text-white/80">
                    {token.name}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      token.status === "active"
                        ? "success"
                        : token.status === "paused"
                        ? "warning"
                        : "error"
                    }
                  >
                    {token.status}
                  </Badge>
                  <button onClick={()=>{setOpenModal(true);setTokenChange({token:token._id,status:token.status==='paused'?'active':'paused'})}} 
                  className="inline-flex items-center gap-2 text-[.6em] rounded-lg border border-gray-300 bg-white px-3 py-.5 ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                  {token.status==='paused'?'Play':'Pause'}
                  </button>
                </TableCell>
                <TableCell className="py-3 flex items-center gap-3 text-gray-700 dark:text-white/80">
                    {tokens[i].slice(0,30)}... 
                    <button onClick={()=>{handleCopy(tokens[i])}} 
                    className="inline-flex items-center gap-2 text-[.6em] rounded-lg border border-gray-300 bg-white px-3 py-.5 ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                    Copy
                    </button>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <button onClick={()=>{setOpenModal(true);setTokenChange({token:token._id,status:'deleted'})}} 
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 ml-1 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> 
                  <TrashBinIcon/>
                  </button>
                  
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          </Table>
          {tokensShowArray.length==0?<div className="text-gray-300" style={{width:'100%',textAlign:'center',padding:'10px'}}>
            <p>There aren't instances yet </p>
            <button onClick={()=>{setActionToken(2)}} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
              Create new instance 
            </button>
            <br />
          </div>:''}
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)} className="text-black dark:text-white mt-[-20vh]">
            <div className="h-[10vh] p-5">
              <h1 className="text-[1.6em]">{tokenChange.status=='deleted'?'Delete':'Play / Pause'}</h1>
            </div>
            <div className="h-[15vh] p-5 flex">
              Are you sure to {tokenChange.status=='deleted'?'delete':tokenChange.status==='active'?'play':'pause'} it?
            </div>
            <div className="h-[8vh] py-2 px-10">
             <a className={`cursor-pointer float-right`} onClick={()=>{editToken(tokenChange.token,tokenChange.status ||'active')}}>{tokenChange.status=='deleted'?'Delete now':tokenChange.status==='active'?'Play now':'Pause now'}</a>
            </div>
      </Modal>
    </div>
  );
}


