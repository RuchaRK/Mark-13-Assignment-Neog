function dateReverse(date) {
    var dateSplit = date.split("");
    var dateReverse = dateSplit.reverse();
    var dataJoin = dateReverse.join("");
    console.log(dataJoin);
    return dataJoin;
  }
  function checkPalindrome(date) {
    var orgDate = date;
    var palinDate = dateReverse(date);
    return orgDate === palinDate;
  }
  // var date={
  //     day:20,
  //     month:2,
  //     year:2020
  // }
  function dateToString(date) {
    console.log(date);
  
    var dateString = { day: "", month: "", year: "" };
    if (date.day < 10) {
      dateString.day = "0" + date.day;
    } else {
      dateString.day = date.day.toString();
    }
    if (date.month < 10) {
      dateString.month = "0" + date.month;
    } else {
      dateString.month = date.month.toString();
    }
    dateString.year = date.year.toString();
    return dateString;
  }
  
  function dateCombinatios(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  function palindromeCheckDateCombos(date) {
    var comboDate = dateCombinatios(date);
    var listOfDate = [];
    for (var i = 0; i < comboDate.length; i++) {
      var result = checkPalindrome(comboDate[i]);
      listOfDate.push(result);
    }
    return listOfDate;
  }
  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 4) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    return false;
  }
  function getNextDate(date) {
    var day1 = date.day + 1;
    var month1 = date.month;
    var year1 = date.year;
    var daysInList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month1 === 2) {
      if (isLeapYear(year1)) {
        if (day1 > 29) {
          day1 = 1;
          month1 = 3;
        }
      } else {
        if (day1 > 28) {
          day1 = 1;
          month1 = 3;
        }
      }
    } else {
      if (day1 > daysInList[month1 - 1]) {
        day1 = 1;
        month1++;
      }
    }
    if (month1 > 12) {
      month1 = 1;
      year1++;
    }
    console.log(day1 + " " + month1 + " " + year1);
    return { day: day1, month: month1, year: year1 };
  }
  
  
  function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var ctr = 0;
  
    while (1) {
      ctr++;
      var dateStr = dateToString(nextDate);
      var resultList = palindromeCheckDateCombos(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [ctr, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  
  var birthdayInput = document.querySelector("#date1");
  var btn1 = document.querySelector("#btn");
  var msg = document.querySelector("#msg");
  
  function handler() {
    console.log("runnin");
    var inputDate = birthdayInput.value;
    console.log(inputDate);
    if (inputDate !== "") {
      var dateSp = inputDate.split("-");
      var dd = dateSp[2];
      var mm = dateSp[1];
      var yy = dateSp[0];
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yy),
      };
      var dataString = dateToString(date);
      var isPalinrome = palindromeCheckDateCombos(dataString);
      console.log(isPalinrome);
      var flag = false;
      for (var i = 0; i < isPalinrome.length; i++) {
        if (isPalinrome[i]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        var [counter, date1] = getNextPalindromeDate(date);
  
        msg.innerText =
  
          "Your Birthday is not palindrome😢😢😢" + ", " + "Next palindrome date is " + date1.day + "-" + date1.month + "-" + date1.year + ", " + "Remainig No.of days for next date is " + counter;
      } else {
        msg.innerText = "your birthday is palindrome 🥳 🥳 ";
        console.log("your birthday is palindrome");
      }
    }
    else {
      msg.innerText = "Please enter birthdate and check"
    }
  
    // console.log(date)
  }
  btn1.addEventListener("click", handler);