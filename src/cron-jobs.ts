import cron from 'node-cron';
import sendMail from './mail'

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute (0 - 59)
# │ │ ┌────────── hour (0 - 23)
# │ │ │ ┌──────── day of month (1 - 31)
# │ │ │ │ ┌────── month   (1 - 12)
# │ │ │ │ │ ┌──── day of week (0 - 7) (Sunday to Saturday
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *
*/

// run hello world every minute

// cron.schedule('* * * * * *', () => {
//     console.log('Hello World');
// });

// run hello world every 5 minutes

cron.schedule('* * * * *', () => {
    sendMail(
        "weirdicily@gmail.com",
        'Upgrade your membership to VIP',
        "🙏Hello, for as low as $20 per month you can join our VIP family for exclusive services and major discounts on everything.The offer stands till " , 
        "Icily"  
    )
});

// cron.schedule('*/2 * * * *', () => {
//     console.log('Hello World after 2 minutes');
// });

// run  a function on sunday at 12:00 of may, june, july, august, september, october, november, december

// const mailMe = () => {
//     console.log('Mail me');
// }


// const mailMe = () => {
//     console.log('Mail me');
// }

// cron.schedule('0 12 * 5-12 0', () => {
//     mailMe(); // Mail me
// });

// You may also use day of week:
// cron.schedule('* * * * 0,6', () => {
//     console.log('running on weekends');
// });


// 1. scheduled : A boolean to set if the created task is scheduled. Default true;
// 2. timezone : The timezone that will be used for job scheduling. It's recommended that you set this to your server's local timezone to avoid any confusion. Default is your local timezone;

// run hello world every minute using american timezone

// cron.schedule('* * * * *', () => {
//     console.log('Hello World');
// }, {
//     scheduled: true,
//     timezone: 'America/New_York'
// });