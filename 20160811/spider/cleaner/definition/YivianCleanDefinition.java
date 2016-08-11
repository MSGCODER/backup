package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/8/2.
 */
public class YivianCleanDefinition extends HulkUrlCleanDefinition {
    private String[] regex = {
            "http://yivian\\.com/\\d{4}/\\d{2}/\\d{2}/.+/\\d+",
    };

    @Override
    public String[] getRegex() {
        return regex;
    }
}
