import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
  const currency = '₹'
  const calculateAge = (dob)=>{
    console.log(dob);
    
      const today = new Date()
      const birthDate = new Date(dob)
      let age = today.getFullYear() - birthDate.getFullYear()
      return age;
  } 
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const slotDate = (slotDate)=>{
      const dateArray = slotDate.split('_')
      return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2] 
  }
        const value ={
           calculateAge,
           slotDate, currency
      }

      return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
      )
}

export default AppContextProvider