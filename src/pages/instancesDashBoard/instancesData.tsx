import { useEffect, useMemo, useRef, useState } from "react"
import ComponentCard from "../../components/common/ComponentCard"
import { useGlobalData } from "../../globalVar/globalVar"
import Input from "../../components/form/input/InputField"




export default function InstancesData({show,setAction,instanceDataId,action}:{show:boolean,setAction:(action:number)=>void,instanceDataId:string,action:number}){
    return(
        <div className={`${!show?'hidden':''} p-0`}>
            <InstancesDataDiv instanceDataId={instanceDataId} setAction={setAction} action={action}></InstancesDataDiv>
        </div>
    )
}

function InstancesDataDiv({instanceDataId,setAction,action}:{instanceDataId:any,setAction:(n:number)=>void,action:number}){
    const {userToken}=useGlobalData();
    const [inputSeach,setInputSeach]=useState('')
    const [contacts, setContacts] = useState<Array<{
                                                    id: string;
                                                    name?: string;
                                                    notify?: string;
                                                    show: string;
                                                    group: boolean;
                                                  }>>([]);
    const [instanceData,setInstanceData]=useState<any>()
    const [load,setLoad]=useState(true);
    const [chats,setChats]=useState();
    const [inputWrite,setInputWrite]=useState('')
    const scrollRef = useRef<HTMLDivElement>(null);
    const url=import.meta.env.VITE_IS_PRODUCTION!='FALSE'?'':import.meta.env.VITE_URL_TEST;

    const [contactChoose,setContactChoose]=useState<{
      id: string;
      name?: string;
      notify?: string;
      show: string;
      group: boolean;
    }| null>()
    
    useEffect(()=>{
      if(instanceDataId==''){return}
      try {
        setAction(0)
        checkInstance();
        checkInstanceData()
      } catch (error) {
        console.log("there is an error",error)
      }
    },[instanceDataId])

    async function checkInstance(){
        try {
          const data=await fetch(url+'/api/instance/contacts', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({instanceId:instanceDataId})
          }).then(response => response.json());
          const newContacts=data.data.contacts.map((a,i)=>{
            const newVar={...a,show:a.name || a.notify,group:a.id.endsWith('@g.us'),number:a.id.split("@")[0]}
            //console.log(newVar)
            return newVar
          })
          newContacts.sort((a, b) => a.show.localeCompare(b.show));
          const users = newContacts.filter(a => !a.group);
          const groups = newContacts.filter(a => a.group);
          setContacts([...users, ...groups]);
          setAction(4)
        } catch (error) {
          console.log("there is an error",error)
        }
        
    }
    async function checkInstanceData(){
      try {
        const data=await fetch(url+'/api/instance/get', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({instanceId:instanceDataId})
        }).then(response => response.json());
        const instanceDataFetch=data.data.instances[0]
        setInstanceData(instanceDataFetch)
        setAction(4)
      } catch (error) {
        setAction(1)
        console.log("there is an error",error)
      }
    }
    function startsWith120(input:string) {
      return input.toString().startsWith('120');
    }

    const contactsShows=useMemo(()=>{
       let newContacts=[...contacts];
       newContacts=newContacts.filter(a=> a.show.toLowerCase().indexOf(inputSeach.toLowerCase())>=0)
       return newContacts;
    },[contacts,inputSeach])

    async function chooseContact(newVal){
      setChats(undefined)
      setContactChoose(newVal);
      setTimeout(()=>{
        checkChatsData(newVal);
      },400)
      
    }
    async function checkChatsData(newVal){
      try {
        const data=await fetch(url+'/api/instance/chat', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({instanceId:instanceDataId,remoteJid:newVal?.id,qty:1000000})
        }).then(response => response.json());
        setChats(data.data.chats)
        console.log(data.data.chats)
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 300);
        
      } catch (error) {
        console.log("there is an error",error)
      }
    }

    async function sendChat(){
      try {
        setInputWrite('')
        const data=await fetch(url+'/api/instance/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({instanceId:instanceDataId,remoteJid:contactChoose?.id || '', message: inputWrite})
        }).then(response => response.json());
        if(data.data?.errors){alert('An error has happended');return}
        const newChat=chats?[...chats,data.data.message]:[data.data];
        setChats(newChat)
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }, 300);
        
      } catch (error) {
        console.log("there is an error",error)
      }
    }

    return(
      <div className="grid grid-cols-12 p-0 mt-[0px] md:mt-[-10px] gap-4 w-full text-black dark:text-white">
        <div className="col-span-12 md:col-span-4 p-0">
              <ComponentCard title={`Contacts`} className="h-[50vh] md:h-[80vh]">
              <Input type="text" value={inputSeach} onChange={(e)=>{setInputSeach(e.target.value)}} className="mt-[-20px] mb-[0px]"></Input>
              <div className="m-0 p-0 h-[22vh] md:h-[52vh] overflow-y-auto custom-scroll">
                {
                  contactsShows.map((a,i)=>(
                    <div key={i} onClick={()=>{chooseContact(a)}} className={`cursor-pointer px-1 py-1 border-b-1 border-gray-200 dark:border-gray-600 m-0 ${a.name?'text-black/70 dark:text-white':'text-black/50 dark:text-white/50'}`}>{a.show}{a.name?a.group?'(Group)':'(Contact)':''}<p className="text-xs">+{a.id.split("@")[0]} </p> <p className="text-emerald-500 dark:text-emerald-400 text-xs">ID: {a.id}</p></div>
                  ))
                }
              </div>
              </ComponentCard>
        </div>
        <div className="col-span-12 md:col-span-8">
          <ComponentCard title={`Chats`} className="h-[80vh]">
              <div className={`text-black dark:text-white ${contactChoose?'':'hidden'}`}>
                <center className={`${chats?'hidden':''}`}>
                <div style={{width: "150px",height:"150px",textAlign:'center'}}><div className="lds-hourglass"></div>
                <p style={{marginTop:'-30px'}}>Loading Data</p>
                </div>
                </center>
                <div className={`${chats?'':'hidden'} h-[65vh] mt-[-15px]`}>
                    <div className="h-[57vh] custom-scroll" ref={scrollRef}>
                    {
                      chats?.sort((a,b)=> a.timestamp-b.timestamp).map(a=>{
                        return(
                        <div className={`mb-2 break-all ${(a.reaction || a.empty)?'hidden':''} ${a.fromMe?"w-[80%] p-2 rounded-sm ml-20 mb-2 bg-emerald-100 text-gray-800 dark:bg-emerald-500 dark:text-white/80":"w-[80%] p-2 rounded-sm bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white/80"}`}>
                          <b>{contactChoose?.group? (a.pushName || a.participant.split('@')[0])+": ":''}</b>
                          {a.conversation}
                          {a?.media?.media?`${a?.media?.media}`:''}
                          <button className={`float-right text-xs border-1 p-1 rounded-sm shadow ${a?.media?.media?'hidden':'hidden'}`}>show</button>
                        </div>
                      )})
                    }
                    </div>
                    <div className="h-[8vh] grid grid-cols-12">
                      <div className="col-span-10">
                        <Input type="text" value={inputWrite} onChange={(e)=>{setInputWrite(e.target.value)}}></Input>
                      </div>
                      <div className="col-span-2 px-1">
                          <button className="p-2 rounded-sm bg-black/10 dark:bg-white/10 w-[100%] pt-[12px]" onClick={()=>{sendChat();}}>Send</button>
                          
                      </div>
                    </div>
                </div>
              </div> 
          </ComponentCard>        
        </div>
      </div>
        
    )
}