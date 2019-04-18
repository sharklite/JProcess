package ids.sharklite.jprocess.base;

import ids.minishark.Transfer;
import ids.sharklite.jprocess.util.StringUtil;


public abstract class BaseDao<E extends BaseEntity> extends Transfer<E> {


    private boolean hasId(String id) {
        return id != null && this.getInt("select count(id) from " + this.getTableName() + "where id=?", id) > 0;
    }

    public E findById(String id) {
        E e = this.getEntity();
        e.setId(id);
        return this.query(e);
    }

    public void deleteById(String id) {
        this.executeUpdate("delete from " + this.getTableName() + " where id=?", id);
    }

    public void save(E e) {
        if (this.hasId(e.getId())) {
            this.update(e);
        } else {
            e.setId(StringUtil.getUniqueId());
            this.insert(e);
        }
    }

}
