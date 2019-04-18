package ids.sharklite.jprocess.config;

import ids.minishark.DataBase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@ComponentScan
@Configuration
public class DataSourceConfig {


    @Autowired
    public DataSourceConfig(ApplicationContext applicationContext) {
        DataSource dataSource = applicationContext.getBean(DataSource.class);
        DataBase base = new DataBase();
        base.setDataSource(dataSource);
        base.setPackageConfig("ids.sharklite.jprocess.dao");
    }
}
