package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/8/2.
 */
public abstract class HulkUrlCleanDefinition {
    private final static String SET_PREFIX = "set_";

    /**
     * 判断当前URL是否能够清除
     * @param url
     * @param regex
     * @return
     */
    public boolean isCleanable(String url, String ... regex){
        for(String regexItem : regex){
            if(url.matches(regexItem))
                return false;
        }

        return true;
    }

    /**
     * 获取操作的集合的key
     * @param host
     * @return
     */
    public String getKey(String host){
        return SET_PREFIX + host;
    }

    /**
     * 获取文章详细的匹配规则
     * @return
     */
    public abstract String[] getRegex();
}
