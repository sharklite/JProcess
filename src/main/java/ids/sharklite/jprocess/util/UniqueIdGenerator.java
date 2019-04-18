package ids.sharklite.jprocess.util;


class UniqueIdGenerator {


    private static UniqueIdGenerator instance;
    private final Object lock = new Object();
    private short endIndex = 0; // as short 16bits 4 chars
    private short middleIndex;
    private String middle;

    private UniqueIdGenerator() {
        middleIndex = (short) System.currentTimeMillis();

    }

    static UniqueIdGenerator getInstance() {
        if (instance == null) {
            synchronized (UniqueIdGenerator.class) {
                if (instance == null)
                    instance = new UniqueIdGenerator();
            }
        }
        return instance;
    }

    private static String bytesToHexString(final byte[] data) {
        return StringUtil.bytesToHexString(data);
    }


    private byte[] shortToBytes(short s) {
        byte[] bs = new byte[Short.SIZE / Byte.SIZE];
        return numberToBytes(s, bs);
    }

    private byte[] intToBytes(int t) {
        byte[] bs = new byte[Integer.SIZE / Byte.SIZE];
        return numberToBytes(t, bs);
    }

    //本方法适用于(高位在前，低位在后)的顺序
    private byte[] numberToBytes(int t, byte[] bs) {
        int len = bs.length;
        for (int i = len - 1; i >= 0; i--) {
            bs[i] = (byte) t;
            t = (t >> 8);
        }
        return bs;
    }


    private String shortToHex(short s) {
        return bytesToHexString(shortToBytes(s));
    }

    private String intToHex(int t) {
        return bytesToHexString(intToBytes(t));
    }

    //16 chars
    synchronized String getUniqueId() {
        String end;
        int timestamp = (int) (System.currentTimeMillis() / 1000);//32bits ,8 chars
        synchronized (lock) {
            if (endIndex == 0) {
                middle = shortToHex(middleIndex);
                middleIndex = (short) ((timestamp % Byte.MAX_VALUE) + middleIndex + 1);
            }
            end = shortToHex(endIndex);
            endIndex++;
        }
        return intToHex(timestamp) + middle + end;
    }


}
