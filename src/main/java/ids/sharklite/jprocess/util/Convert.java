package ids.sharklite.jprocess.util;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

public final class Convert {


    private Convert() {
    }


    public static Date parseDate(String date) throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd").parse(date);
    }

    public static Date parseDateTime(String date) throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date);
    }

    public static String fmtDate(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }

    public static String fmtDateTime(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }

    public static Number toNumber(Object object) {
        return toNumber(object, 0);
    }

    public static int toInt(Object object) {
        return (int) toLong(object);
    }

    public static long toLong(Object object) {
        return toNumber(object).longValue();
    }

    public static Number toNumber(Object object, Number defaultValue) {
        String s = String.valueOf(object);
        if (StringUtil.isNumber(s)) {
            return new BigDecimal(s);
        }
        return defaultValue;
    }

    public static boolean toBoolean(Object object) {
        if (object instanceof Boolean)
            return (boolean) object;
        String s = String.valueOf(object).trim();
        return Boolean.parseBoolean(s) || toInt(s) >= 1;
    }


    public static short byteArrayToShort(byte[] b) {
        return (short) ((b[1] & 0xFF) | (b[0] & 0xFF) << 8);
    }


    private static <T> T[] concat(T[] first, T[]... rest) {
        int totalLength = first.length;
        for (T[] array : rest) {
            totalLength += array.length;
        }
        T[] result = Arrays.copyOf(first, totalLength);
        int offset = first.length;
        for (T[] array : rest) {
            System.arraycopy(array, 0, result, offset, array.length);
            offset += array.length;
        }
        return result;
    }


}
