import React,{useState,useRef,useEffect} from 'react'

export default function RoleList() {
  const [num,setNum]=useState(0)
  const dataRef:any = useRef()

  useEffect(() => {
    dataRef.current = num
  },[num])
  
  const add=()=>{
    console.log("更新前",num, dataRef.current)
    setNum(num+1)
    console.log('更新后',num, dataRef.current)
  }

  return (
    <div>
      <p>{num}</p>
      <button onClick={add}>num++</button>
    </div>
  )
}