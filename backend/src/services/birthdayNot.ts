import User from "../models/user";
import { sendNotification } from "./notification";

const birthdayNotifications = async ()=>{
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate()+7);

  const upCommingBirthdays = await User.find({
    $expr: {
      $or: [
        {
          $and: [
            { $eq: [{ $month: "$dob" }, { $month: today }] },
            { $gt: [{ $dayOfMonth: "$dob" }, { $dayOfMonth: today }] },
            { $lt: [{ $dayOfMonth: "$dob" }, { $dayOfMonth: sevenDaysLater }] }
          ]
        },
        {
          $and: [
            { $eq: [{ $month: "$dob" }, { $month: sevenDaysLater }] },
            { $lt: [{ $dayOfMonth: "$dob" }, { $dayOfMonth: sevenDaysLater }] }
          ]
        }
      ]
    }
  });

  const birthdays = await User.find({ $expr: {
    $and:[
      {$eq:[{ $month: "$dob" }, { $month: today }]},
      {$eq:[{ $dayOfMonth: "$dob" }, {$dayOfMonth: today}]}
  ]
  }})

  function dateToString(date:Date){
    return date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long",})
  }

  upCommingBirthdays.forEach((user)=>{
    user.friends.forEach((friend)=>{
      sendNotification({
        receiverId: friend._id,
        message: `Reminder: ${user.username} birthday is comming up on ${dateToString(user.dob)}`,
        type: "birthday",
        relatedUser: user._id,
      });
    });
  });

  birthdays.forEach((user)=>{
    user.friends.forEach((friend)=>{
      sendNotification({
        receiverId: friend._id,
        message: `Reminder: Today is ${user.username}'s Birthday, let's celebrate with him`,
        type: "birthday",
        relatedUser: user._id,
      });
    });
  });
}

export default birthdayNotifications;