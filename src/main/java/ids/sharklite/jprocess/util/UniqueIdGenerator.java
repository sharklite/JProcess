package ids.sharklite.jprocess.util;


class UniqueIdGenerator {


    private static UniqueIdGenerator instance;
    private int endIndex;


    private UniqueIdGenerator() {
        endIndex = (int) System.nanoTime();
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


    private String intToHex(int t) {
        return bytesToHexString(intToBytes(t));
    }

    //16 chars ,8 bytes
    synchronized String getUniqueId() {
        return intToHex((int) (System.currentTimeMillis() / 1000)) + intToHex(++endIndex);
    }


}
