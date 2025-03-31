export const pascalCase = (string:string)=>{
  const fistLetter = string?.slice(0,1);
  const rest = string?.slice(1);
  return fistLetter?.toUpperCase()+ rest;
}

export const displayName = (user: any) => {
  if (!user.firstName && !user.lastName) {
    return pascalCase(user.username);
  }
  if (!user.firstName && user.lastName) return pascalCase(user.lastName);
  if (!user.lastName && user.firstName) return pascalCase(user.firstName);

  return pascalCase(user.firstName) + " " + pascalCase(user.lastName);
};

export const getInitials = (user:any)=>{
  if(!user.firstName && ! user.lastName){
    return user.username?.slice(0,2).toUpperCase();
  }
  if (!user.firstName && user.lastName)
    return user.lastName.slice(0, 2).toUpperCase();
  if (!user.lastName && user.firstName)
    return user.firstName.slice(0, 2).toUpperCase();

  return user?.firstName.slice(0,1).toUpperCase()+user.lastName.slice(0,1).toUpperCase();
}

export const getNextBirthday = (birthDate: Date | string) => {
  if (!birthDate) return "Invalid date";

  const parsedDate = new Date(birthDate);
  if (isNaN(parsedDate.getTime())) return "Invalid date";

  const today = new Date();
  let nextBirthday = new Date(
    today.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
  );

  if (nextBirthday < today) {
    nextBirthday = new Date(
      today.getFullYear() + 1,
      parsedDate.getMonth(),
      parsedDate.getDate(),
    );
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  return nextBirthday.toLocaleDateString("en-US", options);
};

export const sortFriendsByNextBirthday = (friends: any[]) => {
  if (!friends || friends.length === 0) return [];

  const today = new Date();
  return friends
    .filter((friend) => friend.dob) // Ensure friend has a valid date of birth
    .map((friend) => {
      const dob = new Date(friend.dob); // Ensure dob is a Date object

      let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
      if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, dob.getMonth(), dob.getDate());
      }

      return { name: displayName(friend), nextBirthday, id: friend._id };
    })
    .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());
};

export const getFirst3 = (array: any[]) => {
  return array.length > 3 ? array.slice(0, 3) : array;
};

export const calculateAge = (birthdate:any) => {
  if(!birthdate) return ;
  if (!(birthdate instanceof Date)) {
    birthdate = new Date(birthdate);
  }
  const today = new Date();
  let age = today.getFullYear() - birthdate?.getFullYear();
  const monthDiff = today.getMonth() - birthdate?.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate?.getDate())) {
    age--;
  }
  return age;
};

export const dateFormat = (date: Date | string)=> {
  if(!date){
    return;
  }
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const day = parsedDate.getDate();
  const month = parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" }); 
  
  const getOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) return "th"; 
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}`;
};