package ids.sharklite.jprocess.base;


public abstract class BaseEntity {

    public abstract String getId();

    public abstract void setId(String id);

    @Override
    public int hashCode() {
        String eid = this.getId();
        if (eid != null && eid.length() == 16) {
            try {
                return (int) (Long.parseLong(eid, 16) >>> 8); //5c9c3191846a0002
            } catch (Exception e) {
                //ignore
            }
        }
        return super.hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || o.getClass() != getClass())
            return false;
        String eid = ((BaseEntity) o).getId();
        return (eid != null) && eid.equals(this.getId());
    }
}
