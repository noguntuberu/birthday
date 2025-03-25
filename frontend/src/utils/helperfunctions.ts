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
