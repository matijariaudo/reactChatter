import { useState } from "react"
import ComponentCard from "../../components/common/ComponentCard"
import Input from "../../components/form/input/InputField"
import Label from "../../components/form/Label"
import { useGlobalData } from "../../globalVar/globalVar";





export default function ApiTokenForm({show,setAction}:{show:boolean,setAction:(action:number)=>void}){
    const [input,setInput]=useState('');
    const {tokensFunction}=useGlobalData()
    async function clickButtonCreate(){
        if(input==''){alert('You must enter a valid name.');return}
        setAction(0)
        const rta=await tokensFunction.createTokens(input)
        if(rta){
            setAction(100);
        }else{
            setAction(2);
            alert('An error has occurred, please try again.')
        }
    }
    return(
        <div className={`${!show?'hidden':''}`}>
            <button onClick={()=>{setAction(1)}} className="mb-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Go back </button>
            <ComponentCard title="Api token">
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
                </div>
                <button onClick={()=>{clickButtonCreate()}} className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-emerald-400 text-theme-sm hover:bg-emerald-500">
                Continue
                </button>
      
            </ComponentCard>
            <button onClick={()=>{setAction(1)}} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"> Go back </button>
        </div>
    )
}