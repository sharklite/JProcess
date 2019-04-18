package ids.sharklite.jprocess.onlineinformation;

import ids.sharklite.jprocess.entity.OnlineUser;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CurrentOnline {

    public static final Map<String, OnlineUser> ONLINE_USERS = new ConcurrentHashMap<>();
}
