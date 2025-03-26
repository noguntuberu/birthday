export const pascalCase = (string:string)=>{
  const fistLetter = string.slice(0,1);
  const rest = string.slice(1);
  return fistLetter.toUpperCase()+ rest;
}

export const displayName = (user:any)=>{
  if(!user.firstName && ! user.lastName){
    return pascalCase(user.username);
  }
  if(!user.firstName && user.lastName) return pascalCase(user.lastName);
  if(!user.lastName && user.firstName) return pascalCase(user.firstName);

  return pascalCase(user.firstName) +" "+pascalCase(user.lastName);
}

export const getInitials = (user:any)=>{
  if(!user.firstName && ! user.lastName){
    return user.username.slice(0,2).toUpperCase();
  }
  if(!user.firstName && user.lastName) return user.lastName.slice(0,2).toUpperCase()
  if(!user.lastName && user.firstName) return user.firstName.slice(0,2).toUpperCase()

  return user.firstName.slice(0,1).toUpperCase()+user.lastName.slice(0,1).toUpperCase();
}