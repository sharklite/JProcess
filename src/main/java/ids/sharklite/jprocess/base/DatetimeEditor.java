package ids.sharklite.jprocess.base;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.regex.Pattern;


class DatetimeEditor extends PropertyEditorSupport {

    private static final Pattern PATTERN_DATE = Pattern.compile("[/:.-]|年|月|日|时|分|秒|\\s+");
    private boolean error = false;


    @Override
    public void setAsText(String text) {
        if (text == null || text.length() < 10) {
            setValue(null);
            return;
        }

        //format must be "yyyy-[M]M-[d]d [H]H:[m]m:[s]s[.SSS]"
        int year = 0;
        int month = 0;
        int day = 0;
        int hours = 0;
        int minutes = 0;
        int seconds = 0;
        int millis = 0;

        String[] s = PATTERN_DATE.split(text);
        int len = s.length;
        if (len != 0) {
            year = tryInt(s[0]);
            if (len >= 2)
                month = tryInt(s[1]);
            if (len >= 3)
                day = tryInt(s[2]);
            if (len >= 4)
                hours = tryInt(s[3]);
            if (len >= 5)
                minutes = tryInt(s[4]);
            if (len >= 6)
                seconds = tryInt(s[5]);
            if (len >= 7)
                millis = tryInt(s[6]);
        }
        if (error) {
            setValue(null);
            throw new RuntimeException("cannot parse date: \"" + text + "\"");
        }
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, (month - 1));
        calendar.set(Calendar.DAY_OF_MONTH, day);
        calendar.set(Calendar.HOUR_OF_DAY, hours);
        calendar.set(Calendar.MINUTE, minutes);
        calendar.set(Calendar.SECOND, seconds);
        calendar.set(Calendar.MILLISECOND, millis);
        setValue(new Timestamp(calendar.getTimeInMillis()));
    }

    private int tryInt(String s) {
        if (!error) {
            try {
                return Integer.parseInt(s);
            } catch (Exception e) {
                e.printStackTrace();
                error = true;
            }
        }
        return 0;
    }


}
