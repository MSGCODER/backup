package com.aiztone.hulk.spider.scheduler;

import com.alibaba.fastjson.JSON;
import org.apache.commons.codec.digest.DigestUtils;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;
import us.codecraft.webmagic.Request;
import us.codecraft.webmagic.Task;
import us.codecraft.webmagic.scheduler.DuplicateRemovedScheduler;
import us.codecraft.webmagic.scheduler.MonitorableScheduler;
import us.codecraft.webmagic.scheduler.component.DuplicateRemover;

/**
 * Created by lenn on 16/7/27.
 */
public class RedisScheduler extends DuplicateRemovedScheduler implements MonitorableScheduler, DuplicateRemover {
    private ShardedJedisPool pool;

    private static final String QUEUE_PREFIX = "queue_";

    private static final String SET_PREFIX = "set_";

    private static final String ITEM_PREFIX = "item_";

    public RedisScheduler(ShardedJedisPool shardedJedisPool) {
        this.pool = shardedJedisPool;
        setDuplicateRemover(this);
    }

    @Override
    public boolean isDuplicate(Request request, Task task) {
        ShardedJedis jedis = pool.getResource();
        try {
            boolean isDuplicate = jedis.sismember(getSetKey(task), trimUrl(request.getUrl()));
            if (!isDuplicate) {
                jedis.sadd(getSetKey(task), trimUrl(request.getUrl()));
            }
            return isDuplicate;
        } finally {
            pool.returnResource(jedis);
        }
    }

    @Override
    protected void pushWhenNoDuplicate(Request request, Task task) {
        ShardedJedis jedis = pool.getResource();
        try {
            jedis.rpush(getQueueKey(task), trimUrl(request.getUrl()));
            if (request.getExtras() != null) {
                String field = DigestUtils.shaHex(trimUrl(request.getUrl()));
                String value = JSON.toJSONString(request);
                jedis.hset((ITEM_PREFIX + task.getUUID()), field, value);
            }
        } finally {
            pool.returnResource(jedis);
        }
    }

    @Override
    public void resetDuplicateCheck(Task task) {
        ShardedJedis jedis = pool.getResource();
        try {
            jedis.del(getSetKey(task));
        } finally {
            pool.returnResource(jedis);
        }
    }

    @Override
    public int getLeftRequestsCount(Task task) {
        ShardedJedis jedis = pool.getResource();
        try {
            Long size = jedis.llen(getQueueKey(task));
            return size.intValue();
        } finally {
            pool.returnResource(jedis);
        }
    }

    @Override
    public int getTotalRequestsCount(Task task) {
        ShardedJedis jedis = pool.getResource();
        try {
            Long size = jedis.scard(getSetKey(task));
            return size.intValue();
        } finally {
            pool.returnResource(jedis);
        }
    }

    @Override
    public synchronized Request poll(Task task) {
        ShardedJedis jedis = pool.getResource();
        try {
            String url = jedis.lpop(getQueueKey(task));
            if (url == null) {
                return null;
            }
            String key = ITEM_PREFIX + task.getUUID();
            String field = DigestUtils.shaHex(url);
            byte[] bytes = jedis.hget(key.getBytes(), field.getBytes());
            if (bytes != null) {
                Request o = JSON.parseObject(new String(bytes), Request.class);
                return o;
            }
            Request request = new Request(url);
            return request;
        } finally {
            pool.returnResource(jedis);
        }
    }

    protected String getSetKey(Task task) {
        return SET_PREFIX + task.getUUID();
    }

    protected String getQueueKey(Task task) {
        return QUEUE_PREFIX + task.getUUID();
    }

    protected String trimUrl(String url){
        if(url.lastIndexOf('#') != -1){
            url = url.substring(0, url.lastIndexOf('#'));
        }
        return url;
    }
}
