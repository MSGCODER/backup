package com.aiztone.hulk.spider.cleaner.definition;

/**
 * Created by lenn on 16/8/3.
 */
public class VrzyCleanDefinition extends HulkUrlCleanDefinition {
    private String[] regex = {
            "http://www\\.vrzy\\.com",
    };

    @Override
    public String[] getRegex() {
        return regex;
    }
}
