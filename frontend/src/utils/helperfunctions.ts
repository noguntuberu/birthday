export const pascalCase = (string: string) => {
  const fistLetter = string.slice(0, 1);
  const rest = string.slice(1);
  return fistLetter.toUpperCase() + rest;
};

export const displayName = (user: any) => {
  if (!user.firstName && !user.lastName) {
    return pascalCase(user.username);
  }
  if (!user.firstName && user.lastName) return pascalCase(user.lastName);
  if (!user.lastName && user.firstName) return pascalCase(user.firstName);

  return pascalCase(user.firstName) + " " + pascalCase(user.lastName);
};

export const getInitials = (user: any) => {
  if (!user.firstName && !user.lastName) {
    return user.username.slice(0, 2).toUpperCase();
  }
  if (!user.firstName && user.lastName)
    return user.lastName.slice(0, 2).toUpperCase();
  if (!user.lastName && user.firstName)
    return user.firstName.slice(0, 2).toUpperCase();

  return (
    user.firstName.slice(0, 1).toUpperCase() +
    user.lastName.slice(0, 1).toUpperCase()
  );
};

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
  if (!friends.length) return [];

  const today = new Date();
  return friends
    .filter((friend) => friend.dob)
    .map((friend) => {
      let nextBirthday = new Date(
        today.getFullYear(),
        friend.dob!.getMonth(),
        friend.dob!.getDate(),
      );
      if (nextBirthday < today) {
        nextBirthday = new Date(
          today.getFullYear() + 1,
          friend.dob!.getMonth(),
          friend.dob!.getDate(),
        );
      }
      return { name: friend.name, nextBirthday };
    })
    .sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());
};

export const getFirst3 = (array: any[]) => {
  if (array?.length <= 3) return array;

  const result = array?.slice(0, 3);
  return result;
};
