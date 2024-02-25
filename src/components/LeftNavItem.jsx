import React from 'react'
import useApp from '../context/AppContext'

//reassign a new name to icon to Icon becuase jsx treat lower starting letter as html 
const LeftNavItem = ({name,icon:Icon,classname,divider}) => {
   const {setselectedcategory}=useApp();

  return (
    <>
    <div className={`${classname} flex items-center p-2 w-[240px] gap-1` } onClick={()=>setselectedcategory(name)}>
    {<Icon/>}
     {name==="New"?<span>Home</span>:<span>{name}</span>}
    </div>
    {divider && <hr></hr>}
     </>
  )
}

export default LeftNavItem