<p align="center">
  <img src="https://raw.githubusercontent.com/KrawMire/profitocracy/dev/docs/assets/profitocracy-launchscreen-transparent.png" alt="Title image" height="175px"/>
</p>

<p align="center">
  Welcome to Profitocracy source code! Profitocracy is a multicurrency finance mobile application which helps people to track their expenses.
</p>

## Introduction

Profitocracy is a mobile application that helps people to control their finances and spend money wisely. There will be four versions of the app:

- Cross-platform, written with MAUI
- Cross-platform, created with React Native;
- Android, written with Java;
- iOS, created with Swift.

So, cross-platform app version is an MVP application that was created as a test and made for understanding what I want to get in the end. So, during the development process I highlighted some main terms of this application.

## Understanding of the application

The root rule of this app is a **50-30-20 rule** which states that your money should be separated into three groups: for main expenses (50%), for secondary expenses (30%) and to postpone (other 20%). For example, if you have $1000, you should spend $500 for house rent, food etc, $300 should be spent to other needs, such as entertainment, clothes which is not necessary at the moment, but you want it. And the other $200 you should postpone for the "bad days" or expensive purchases.

There are also some other terms. And if you open cross-platform application (`profitocracy-mobile`), you will see them in the `src/domain` directory. So, let's describe them:

- Anchor date, or anchor day. It's the day of starting billing period. It is used for calculating your expenses by their type (main, secondary and postponed) and daily cash (described below). It's usually the days when you recieve your salary etc;
- The next one is a daily cash. It's the amount of money for a day. For example, your salary is $3000 and you have set anchor days as 10th and 25th. You recieved your half-salary at 10th date ($1500). There are 15 days you have to wait for the second half of your salary. So, we take your current money amount ($1500) and divide it to next 15 days, and we get $100 for a day. It is called daily cash. There are also two types of daily cash: from initial balance and from actual one. We described initial above. Let's explain actual one. For example, you lived 5 days (15th date) and spent only $100 for this period. So now you have $1400, but now it's not for 15 days, but for 10. So your $1400 is divided by 10 days and now you have $140 for a day. Cool, nice job!
- Expense types is a described above terms: they are just types of your expenses. It can be main (necessary things, such as food, rent etc), secondary (not necessary things, entertainment etc) and postponed (saved money).

Thats all, it was the hardest things to inderstand.
