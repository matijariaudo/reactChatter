
import ComponentCard from "../../components/common/ComponentCard";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import PhoneInput from "../../components/form/group-input/PhoneInput";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

export default function InstancesFormDiv() {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  return (
    <ComponentCard title="Instance Form">
      <div className="space-y-6">
        <div>
          <Label>Name</Label>
          <div className="relative">
            <Input
              placeholder="Instance name"
              type="text"
              className="pl-[10px]"
            />
          </div>
        </div>
        <div>
          <Label>Phone line</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+1 (555) 000-0000"
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div>
          <Label>Instance type</Label>
          <Select
          options={[{ value: "Trial", label: "Trial" },{ value: "Free", label: "Free" }]}
          placeholder="Select Option"
          onChange={()=>{alert(1)}}
          className="dark:bg-dark-900"
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
            />
          </div>
        </div>
      <div className="col-12 p-0">
      <button className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-emerald-400 text-theme-sm hover:bg-emerald-500 w-full">
      Continue
      </button>
      </div>
    </ComponentCard>
  );
}
