import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { useGlobalData } from "../../globalVar/globalVar";





export default function InstancesFrom({show,setAction,setInstanceConfig}:{show:boolean,setAction:(action:number)=>void,setInstanceConfig:(instanceConfig:string)=>void}){
    const [input,setInput]=useState("");
    const [select,setSelect]=useState('');
    const [webhook,setWebhook]=useState('')
    const {instancesFunction}=useGlobalData();
    const {createInstances}=instancesFunction;

    async function clickButtonCreate(){
        if(webhook!='' && !isValidURL(webhook)){
            alert('You must enter a url');
            return;
        }
        if(select==''){
            alert('You must enter a type of instance')
            return;
        }
        setAction(0);
        const rta=await createInstances({name:input,type:select,webhook});
        if(!rta){
            alert('An error has happend, pelase try again')
            setAction(2)
           return 
        }else{
           const {instance}=rta;
           if(!instance){return;}  
           setInstanceConfig(instance.instanceId)
           setAction(99); 
        }
    }
    function isValidURL(str:string) {
        try {
          new URL(str);
          return true;
        } catch (_) {
          return false;
        }
    }
    return(
        <div className={`${!show?'hidden':''}`}>
            <button onClick={()=>{setAction(1)}} className="mb-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Go back </button>
            <ComponentCard title="Instance Form">
                <div className="space-y-6">
                    <div>
                    <Label>Name</Label>
                    <div className="relative">
                        <Input
                        placeholder="Instance name"
                        type="text"
                        className="pl-[10px]"
                        value={input}
                        onChange={(e)=>{setInput(e.target.value)}}
                        />
                    </div>
                    </div>
                    <div>
                    <Label>Instance type</Label>
                    <Select
                    options={[{ value: "trial", label: "Trial" },{ value: "full", label: "Full" }]}
                    placeholder="Select Option"
                    onChange={(e)=>{setSelect(e)}}
                    className="dark:bg-dark-900"
                    defaultValue=""
                    ></Select>
                    </div>
                </div>
                <div>
                    <Label>Webhook</Label>
                    <div className="relative">
                        <Input
                        placeholder="https://yoursite.com"
                        type="text"
                        className="pl-[10px]"
                        value={webhook}
                        onChange={(e)=>{setWebhook(e.target.value)}}
                        />
                    </div>
                    </div>
                <div className="col-12 p-0">
                <button onClick={()=>{clickButtonCreate()}} className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-emerald-400 text-theme-sm hover:bg-emerald-500 ">
                Continue
                </button>
                </div>
            </ComponentCard>
            <button onClick={()=>{setAction(1)}} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Go back </button>
        </div>
    )
}

