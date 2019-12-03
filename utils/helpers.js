import {AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';


const NOTIFICATION_KEY = 'flashCards: notifications';

export function generateID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  export function clearLocalNotification(){

    return AsyncStorage.removeItem(NOTIFICATION_KEY)
       .then(Notifications.cancelAllScheduledNotificationsAsync())
 
   }
 
   export function createNotification(){
     return{
       title: 'continue learning!',
       body: 'dont forget to complete your quizes for today!',
       ios:{
         sound: true
       },
       android:{
         sound: true,
         priority: 'high',
         sticky: false,
         vibrate: true
         
       }
     }
   }

  // this is to set one notification
export function setLocalNotification(){

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
              if(status === 'granted'){
                // if the notification id done, cancel the other notificarions
                Notifications.cancelAllScheduledNotificationsAsync();
                
                // then will set anothor notification for tomorrow
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',                      
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
          })
      }
    })
}
