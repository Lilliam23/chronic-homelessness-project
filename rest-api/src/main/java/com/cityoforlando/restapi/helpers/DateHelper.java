package com.cityoforlando.restapi.helpers;

import java.util.Calendar;
import java.util.Date;

public class DateHelper {

    public static Date currentDateAddDays(Integer numberDays){
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.DATE, numberDays);
        Date newDate = calendar.getTime();
        return newDate;
    }
}
