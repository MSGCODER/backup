package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/7/31.
 */
public class BaiduVrCleanDefinition extends HulkUrlCleanDefinition {
    private String[] regex = {"http://ivr\\.baidu\\.com/.+\\.html#?"};

    @Override
    public String[] getRegex() {
        return regex;
    }
}

