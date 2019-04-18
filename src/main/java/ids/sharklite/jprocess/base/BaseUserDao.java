package ids.sharklite.jprocess.base;


import ids.sharklite.jprocess.entity.AbstractUser;

import java.util.Collection;

public abstract class BaseUserDao<E extends AbstractUser> extends BaseDao<E> {

    @Override
    public void deleteById(String id) {
        this.executeUpdate("update " + this.getTableName() + " set deleted=1 where id=?", id);
    }

    @Deprecated
    @Override
    public void delete(E e) {

    }

    @Deprecated
    @Override
    public void delete(Collection<E> e) {

    }

    public void deleteReally(String userId) {
        this.executeUpdate("delete from " + this.getTableName() + " where id=?", userId);
    }
}
