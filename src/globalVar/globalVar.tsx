import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';


interface User{
    name?: string,
    email?: string,
    token?: string,
    rol?: string,
    session: boolean;
}

export interface instancesFunction{
    fetchInstances: () => Promise<void>;
    deleteInstances: (id: string) => Promise<boolean>;
    createInstances: (body:{name:string,webhook:string,type:string})=>Promise<boolean>
} 
export interface TokensFunction{
  fetchTokens:() => Promise<void>;
  editTokens: (tokenId:string,status:'deleted'|'paused'|'active')=>Promise<boolean>;
  createTokens: (name:string)=>Promise<boolean>;
}


export interface Token{
  id:string;
  name:string;
  status:string
}

export interface ContextType{
    user:User | undefined;
    params?:URLSearchParams;
    instances:any;
    setUserToken:(token:string)=>void;
    userToken:string|undefined;
    tokens:string[];
    tokensData:Token[];
    instancesFunction:instancesFunction,
    tokensFunction:TokensFunction
    //getUser:()=>void;
    //changeStatusTask:(pos:number)=>void;
    //Declaro la interface
}

const GlobalContext=createContext< ContextType | undefined >(undefined);

//Estoy pegando esto donde quiero y el children quedará con lo que tenga adentro y poder usar las variables
export default function GlobalContextProvider({ children }: { children: ReactNode}){
    const [userToken,setUserToken]=useState<string|undefined>();
    const [user,setUser]=useState<User>({session:false});

    const navigate = useNavigate();
    const location=useLocation()

    const [instances,setIntances]=useState<any | undefined>(null);
    const [tokens,setTokens]=useState<any | undefined>();
    const [tokensData,setTokensData]=useState<any | undefined>(null);
    const siteNocheck=['/app/signin','/app/signup'];
    const url=import.meta.env.VITE_IS_PRODUCTION!='FALSE'?import.meta.env.VITE_URL_PRODUCTION:import.meta.env.VITE_URL_TEST;

  useEffect(()=>{
        const localToken=localStorage.getItem('token')
        if(localToken){setUserToken(localToken)}
        if(!localToken){
          if(!siteNocheck.includes(location.pathname.toLocaleLowerCase()))
          {
            navigate('/app/signin')                 
          }
        }
        console.log(location)
  },[location.pathname])

  async function fetchInstances(){
        const dataInstances = await fetch(url+'/api/instance/get', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
          }).then(response => response.json());
          console.log(dataInstances.data)
          const {instances:instancesDataArray}=(dataInstances.data);
          setIntances(instancesDataArray);
  }

  async function deleteInstances(id:string){
         try {
            const dataInstances = await fetch(url+'/api/instance/delete', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${userToken}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({instanceId:id})
              }).then(response => response.json());
              const {errors}=dataInstances.data;
              if(errors){
                throw new Error(errors)
              }
              return true;
         } catch (error) {
              console.log(error)
              return false;             
         }
  }
  async function createInstances(body:{name:string,webhook:string,type:string}){
        try {
           const dataInstances = await fetch(url+'/api/instance/create', {
               method: 'POST',
               headers: {
                 'Authorization': `Bearer ${userToken}`,
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(body)
             }).then(response => response.json());
             const {errors}=dataInstances.data;
             if(errors){
               throw new Error(errors)
             }
             return true;
        } catch (error) {
             console.log(error)
             return false;             
        }
   }

  async function fetchUser() {
        try {
          const dataUser = await fetch(url+'/login/users/check', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({})
          }).then(response => response.json());
          if(dataUser.error){throw new Error(dataUser.error)}
          const {correo,nombre,rol,email_valid,password}=dataUser.data.user;
          console.log(dataUser.data)
          setUser({email:correo,name:nombre,rol,session:true});
          if(!email_valid){
            navigate('/app/checkEmail')
          }
          if(!password){
            navigate('/app/profile?action=password');
          }  
        } catch (error) {
            navigate('/app/signin');
        }    
  }

    async function fetchTokens(){
        const dataUser = await fetch(url+'/login/users/getapitoken', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }).then(response => response.json());
        if(dataUser.error){throw new Error(dataUser.error)}
        console.log(dataUser.data)
        const {tokensData,tokens}=dataUser.data
        setTokensData(tokensData);
        setTokens(tokens);
    }

    async function editTokens(tokenId:string,status:'deleted'|'paused'|'active'){
      try {
        const dataUser = await fetch(url+'/login/users/editapitoken', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({tokenId,status})
        }).then(response => response.json());
        if(dataUser.error){throw new Error(dataUser.error)}
        return true;
      } catch (error) {
        return false;
      }
      
  }

  async function createTokens(name:string){
    try {
      const dataUser = await fetch(url+'/login/users/apitoken', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name})
      }).then(response => response.json());
      if(dataUser.error){throw new Error(dataUser.error)}
      return true;
    } catch (error) {
      return false;
    }
  }

    useEffect(()=>{
        const checkToken=async()=>{
            console.log("Chequeando usuario")
            try {
                 fetchUser();
                 fetchInstances();
                 fetchTokens();
            } catch (error: unknown) {
                console.log(error)
                if (error instanceof Error) {
                  if(error.message=='Body params issues'){
                    localStorage.removeItem('token')
                    navigate('/app/signin')
                  }
                } else {
                  console.log("Unknown error");
                }
            }
        }
        if(userToken){
            localStorage.setItem('token',userToken || '');
            checkToken();
        }
    },[userToken])

    const instancesFunction={
        fetchInstances,
        deleteInstances,
        createInstances
    };
    const tokensFunction={
      fetchTokens,
      editTokens,
      createTokens
    }
    return(
        <GlobalContext.Provider value={{user,instances,setUserToken,userToken,instancesFunction,tokens,tokensData,tokensFunction}}>
            {children}
        </GlobalContext.Provider>
    )
}
//Estoy exportando el uso, así no debo exportar GlobalContext, solo la función que llama a la local entonces en los
//children solo cuando quiero usar const context=useGlobalData() ya recibo toda la info de las variables del value={{}}
export function useGlobalData(){
    const context= useContext(GlobalContext)
    if(!context)throw new Error("useGlobalData debe usarse dentro de GlobalContextProvider");
    return context;
}


