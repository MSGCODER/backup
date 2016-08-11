package com.aiztone.hulk.spider.cleaner;

import com.aiztone.hulk.spider.cleaner.definition.HulkUrlCleanDefinition;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;

import java.util.Set;

/**
 * Created by lenn on 16/7/31.
 */
public class HulkUrlCleaner {

    private String host;

    private ShardedJedisPool pool;

    private HulkUrlCleanDefinition urlCleanDefinition;

    public static HulkUrlCleaner create(){
        return new HulkUrlCleaner();
    }

    public HulkUrlCleaner setHost(String host) {
        this.host = host;
        return this;
    }

    public HulkUrlCleaner setPool(ShardedJedisPool pool) {
        this.pool = pool;
        return this;
    }

    public HulkUrlCleaner setUrlCleanDefinition(HulkUrlCleanDefinition urlCleanDefinition) {
        this.urlCleanDefinition = urlCleanDefinition;
        return this;
    }

    public void run(){
        if(host == null || urlCleanDefinition == null || pool == null){
            return;
        }
        ShardedJedis jedis = pool.getResource();
        try{
            String key = urlCleanDefinition.getKey(this.host);
            Set<String> urls = jedis.smembers(key);
            for(String url : urls){
                if(urlCleanDefinition.isCleanable(url, urlCleanDefinition.getRegex())){
                    jedis.srem(key, url);
                }
            }

        }finally {
            pool.returnResource(jedis);
        }
    }
}
