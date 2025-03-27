interface InputTypes{
    placeholder: string,
    ref: any,
    type: string
}

export function Input({placeholder, ref, type}: InputTypes){
    return <>
        <input ref={ref} placeholder={placeholder} type={type} className="px-2  py-2 w-72 text-black bg-yellow-100 rounded-lg placeholder-black"/>
    </>
}