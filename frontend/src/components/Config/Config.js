export const getSender=(loggedUser,users)=>{
    console.log(loggedUser,users)

  return users?.[0].email===loggedUser?.email ? users?.[1].name:users?.[0].name

}


export const getSenderDetails=(loggedUser,users)=>{
    console.log(loggedUser,users)

  return users?.[0].email===loggedUser?.email ? users?.[1]:users?.[0]

}